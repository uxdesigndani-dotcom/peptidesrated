/**
 * Quiz signup at peptidesrated.com/menopause: receives email + preference + symptoms,
 * adds subscriber to MailerLite so automation sends the results email.
 */

const GROUP_IDS = {
  medical: '181509866782113652',
  research: '181509835425931140',
  both: '181509796834230132',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error('Missing MAILERLITE_API_KEY');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { email, preference, symptoms, quiz_score } = req.body || {};
  if (!email || !String(email).includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const preferenceKey = ['medical', 'research', 'both'].includes(preference) ? preference : 'both';
  const groupId = GROUP_IDS[preferenceKey];
  const symptomLabels = Array.isArray(symptoms) ? symptoms.join(', ') : (symptoms || '');

  const subscriberData = {
    email: String(email).toLowerCase().trim(),
    groups: [groupId],
    fields: {
      peptide_type: preferenceKey,
      symptoms: symptomLabels,
      quiz_date: new Date().toISOString().split('T')[0],
      quiz_score: String(quiz_score != null ? quiz_score : '0'),
    },
  };

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Results email on the way!' });
    }

    if (response.status === 409 || (data.message && data.message.toLowerCase().includes('already'))) {
      const patchRes = await fetch(
        `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(subscriberData.email)}/groups/${groupId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json',
          },
          body: '{}',
        }
      );
      if (patchRes.ok) {
        return res.status(200).json({ success: true, message: 'Results email on the way!' });
      }
    }

    console.error('MailerLite error:', response.status, data);
    return res.status(400).json({ error: data.message || 'Subscription failed. Please try again.' });
  } catch (err) {
    console.error('menopause-subscribe error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
