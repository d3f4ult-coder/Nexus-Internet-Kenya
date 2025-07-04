import React from 'react';
import { useParams } from 'react-router-dom';

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    body: 'We respect your privacy. Your data is stored securely and never shared with third parties except as required by law.'
  },
  terms: {
    title: 'Terms of Service',
    body: 'By using Nexus Internet Kenya, you agree to our terms and conditions. Please use our services responsibly.'
  },
  refund: {
    title: 'Refund Policy',
    body: 'Refunds are available for unused full months of service. Contact support for assistance.'
  }
};

function Legal() {
  const { type } = useParams();
  const content = legalContent[type] || { title: 'Legal', body: 'No content available.' };
  return (
    <div>
      <h1>{content.title}</h1>
      <div className="card">
        <p>{content.body}</p>
      </div>
    </div>
  );
}

export default Legal;
