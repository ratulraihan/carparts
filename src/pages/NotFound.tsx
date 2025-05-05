import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  useEffect(() => {
    // Update the page title
    document.title = 'Page Not Found - AutoPartsPro';
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12">
      <div className="container max-w-md text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg">
              Return Home
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;