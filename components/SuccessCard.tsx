"use client";

import { motion } from 'framer-motion';
import { CheckCircle, Mail, ExternalLink } from 'lucide-react';
import Card from './Card';
import Button from './Button';

interface SuccessCardProps {
  title?: string;
  message?: string;
  showDirectEmails?: boolean;
  onClose?: () => void;
}

const SuccessCard = ({
  title = "Message sent successfully!",
  message = "We'll get back to you within 24 hours.",
  showDirectEmails = true,
  onClose
}: SuccessCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Card className="text-center border-accent/20 bg-gradient-to-br from-accent/5 to-accent-secondary/5">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/20 mb-6"
        >
          <CheckCircle className="w-8 h-8 text-accent" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          <h3 className="text-h2 text-primary">{title}</h3>
          <p className="text-body text-secondary max-w-md mx-auto">{message}</p>
        </motion.div>

        {/* Direct Contact Options */}
        {showDirectEmails && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="pt-6 border-t border-line">
              <p className="text-sm text-tertiary mb-4">Or contact us directly:</p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="tertiary"
                  size="sm"
                  href="mailto:erand@ilmcore.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                  rightIcon={<ExternalLink className="w-3 h-3" />}
                  className="text-accent hover:text-accent-hover"
                >
                  Email Erand
                </Button>

                <Button
                  variant="tertiary"
                  size="sm"
                  href="mailto:isuf@ilmcore.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                  rightIcon={<ExternalLink className="w-3 h-3" />}
                  className="text-accent hover:text-accent-hover"
                >
                  Email Isuf
                </Button>
              </div>
            </div>

            {onClose && (
              <div className="pt-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onClose}
                  className="text-sm"
                >
                  Send Another Message
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default SuccessCard;