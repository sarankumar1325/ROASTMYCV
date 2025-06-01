
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Mail, Phone, Linkedin, Globe } from 'lucide-react';

interface ValidationResult {
  isValid: boolean;
  message: string;
  suggestions?: string[];
}

const ContactValidator: React.FC = () => {
  const [contacts, setContacts] = useState({
    email: '',
    phone: '',
    linkedin: '',
    website: ''
  });

  const [validation, setValidation] = useState<Record<string, ValidationResult>>({});

  const validateEmail = (email: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const professionalDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com'];
    
    if (!email) return { isValid: true, message: 'Optional' };
    if (!emailRegex.test(email)) {
      return { 
        isValid: false, 
        message: 'Invalid email format',
        suggestions: ['Use format: name@domain.com']
      };
    }
    
    const domain = email.split('@')[1];
    const suggestions = [];
    
    if (!professionalDomains.includes(domain)) {
      suggestions.push('Consider using a professional email domain');
    }
    
    if (email.includes('+') || email.includes('.')) {
      suggestions.push('Avoid special characters or dots in email name');
    }
    
    return {
      isValid: true,
      message: 'Valid email format',
      suggestions: suggestions.length > 0 ? suggestions : undefined
    };
  };

  const validatePhone = (phone: string): ValidationResult => {
    if (!phone) return { isValid: true, message: 'Optional' };
    
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    if (digits.length < 10) {
      return {
        isValid: false,
        message: 'Phone number too short',
        suggestions: ['Include area code', 'Use format: (123) 456-7890']
      };
    }
    
    if (digits.length > 11) {
      return {
        isValid: false,
        message: 'Phone number too long',
        suggestions: ['Remove extra digits', 'US format: (123) 456-7890']
      };
    }
    
    const suggestions = [];
    if (!/[\(\)\-\s]/.test(phone)) {
      suggestions.push('Consider formatting: (123) 456-7890');
    }
    
    return {
      isValid: true,
      message: 'Valid phone format',
      suggestions: suggestions.length > 0 ? suggestions : undefined
    };
  };

  const validateLinkedIn = (url: string): ValidationResult => {
    if (!url) return { isValid: true, message: 'Optional' };
    
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/;
    
    if (!linkedinRegex.test(url)) {
      return {
        isValid: false,
        message: 'Invalid LinkedIn URL format',
        suggestions: [
          'Use format: linkedin.com/in/yourname',
          'Remove extra parameters or tracking codes'
        ]
      };
    }
    
    const suggestions = [];
    if (!url.startsWith('https://')) {
      suggestions.push('Add https:// for clickable links');
    }
    
    return {
      isValid: true,
      message: 'Valid LinkedIn URL',
      suggestions: suggestions.length > 0 ? suggestions : undefined
    };
  };

  const validateWebsite = (url: string): ValidationResult => {
    if (!url) return { isValid: true, message: 'Optional' };
    
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      
      const suggestions = [];
      if (!url.startsWith('http')) {
        suggestions.push('Add https:// for clickable links');
      }
      
      if (urlObj.hostname === 'localhost' || urlObj.hostname.includes('127.0.0.1')) {
        return {
          isValid: false,
          message: 'Localhost URLs not suitable for resumes',
          suggestions: ['Use a live domain or portfolio hosting service']
        };
      }
      
      return {
        isValid: true,
        message: 'Valid website URL',
        suggestions: suggestions.length > 0 ? suggestions : undefined
      };
    } catch {
      return {
        isValid: false,
        message: 'Invalid URL format',
        suggestions: ['Use format: https://yoursite.com', 'Check for typos in domain name']
      };
    }
  };

  const validateAll = () => {
    const results = {
      email: validateEmail(contacts.email),
      phone: validatePhone(contacts.phone),
      linkedin: validateLinkedIn(contacts.linkedin),
      website: validateWebsite(contacts.website)
    };
    
    setValidation(results);
  };

  const getIcon = (field: string) => {
    switch (field) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'website': return <Globe className="h-4 w-4" />;
      default: return null;
    }
  };

  const getValidationIcon = (result: ValidationResult) => {
    if (!result) return null;
    if (result.isValid && !result.suggestions) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    if (result.isValid && result.suggestions) {
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Contact Information Validator</h1>
          <p className="text-gray-600">Ensure your contact details are properly formatted and professional</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@email.com"
                  value={contacts.email}
                  onChange={(e) => setContacts({...contacts, email: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={contacts.phone}
                  onChange={(e) => setContacts({...contacts, phone: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedin"
                  type="url"
                  placeholder="linkedin.com/in/johndoe"
                  value={contacts.linkedin}
                  onChange={(e) => setContacts({...contacts, linkedin: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website/Portfolio
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://johndoe.com"
                  value={contacts.website}
                  onChange={(e) => setContacts({...contacts, website: e.target.value})}
                />
              </div>

              <Button onClick={validateAll} className="w-full">
                Validate Contact Information
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Validation Results</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(validation).length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Click "Validate" to check your contact information
                </p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(validation).map(([field, result]) => (
                    <div key={field} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 font-medium capitalize">
                          {getIcon(field)}
                          {field}
                        </div>
                        {getValidationIcon(result)}
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        {result.message}
                      </div>
                      
                      {result.suggestions && (
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">Suggestions:</Badge>
                          {result.suggestions.map((suggestion, index) => (
                            <div key={index} className="text-xs text-gray-500 pl-2">
                              • {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Professional Contact Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Email Best Practices:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Use firstname.lastname@domain.com format</li>
                  <li>• Avoid nicknames or unprofessional handles</li>
                  <li>• Use established email providers</li>
                  <li>• Check for typos in your email address</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Phone & Links:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Use consistent formatting for phone numbers</li>
                  <li>• Include country code for international applications</li>
                  <li>• Make sure all links are clickable and working</li>
                  <li>• Use professional domain names for websites</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactValidator;
