
import React from 'react';
import NavBar from '../components/NavBar';
import Logo from '../components/Logo';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto max-w-6xl px-4 pt-24 pb-12">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="mb-4">
            <Logo variant="default" showText={false} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Pricing Plans
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to roast your resume to perfection.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {/* Free Plan */}
          <Card className="border-2 border-muted h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <div className="text-4xl font-bold my-3">$0</div>
              <CardDescription>Get started with basic roasting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {['3 resume roasts per month', 'Basic feedback', 'Email support'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Start for Free</Button>
            </CardFooter>
          </Card>
          
          {/* Pro Plan */}
          <Card className="border-2 border-primary relative h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Popular
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="text-4xl font-bold my-3">$9.99</div>
              <CardDescription>Perfect for job seekers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {[
                  'Unlimited resume roasts',
                  'Advanced AI feedback',
                  'Downloadable badges',
                  'Priority support'
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700">
                Get Pro
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Plan */}
          <Card className="border-2 border-muted h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <div className="text-4xl font-bold my-3">$29.99</div>
              <CardDescription>For teams and recruiters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {[
                  'All Pro features',
                  'Team collaboration',
                  'Custom branding',
                  'Analytics dashboard',
                  'Dedicated account manager'
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-16 text-center border-t border-border pt-10">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-left">
            {[
              {
                q: "How honest are the roasts?",
                a: "Our AI provides honest but constructive criticism. You can choose your roast intensity from Mild to Savage."
              },
              {
                q: "Can I cancel my subscription?",
                a: "Yes, you can cancel your subscription at any time from your profile settings."
              },
              {
                q: "Is my resume data secure?",
                a: "We take data privacy seriously. Your resume data is encrypted and never shared with third parties."
              }
            ].map((faq, i) => (
              <div key={i} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <h3 className="font-medium mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t p-4 text-center text-sm text-muted-foreground">
        Powered by Google Generative AI and LangChain
      </footer>
    </div>
  );
};

export default Pricing;
