//@/compoments/NewsletterSignup.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const NewsletterSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: ''
  });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setFormData({ firstName: '', email: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Stay Updated</h3>
      <p className="text-muted-foreground">
        Subscribe to get updates on new articles.
      </p>
      <form className="space-y-2" onSubmit={subscribe}>
        <div className="space-y-2">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full px-4 py-2 rounded-md border bg-background"
            required
            disabled={status === 'loading'}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md border bg-background"
            required
            disabled={status === 'loading'}
          />
        </div>
        <Button 
          className="w-full"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      {(status === 'success' || status === 'error') && (
        <Alert variant={status === 'success' ? 'default' : 'destructive'}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default NewsletterSignup;