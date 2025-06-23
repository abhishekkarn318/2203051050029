import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const storedUrl = localStorage.getItem(`short_${shortcode}`);

    if (storedUrl) {
      window.location.href = storedUrl;
    } else {
      alert("Link not found or expired.");
    }
  }, [shortcode]);

  return null;
};

export default RedirectHandler;
