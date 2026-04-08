import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { Modal } from './Modal';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

export const MailingListForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('mailing_list')
        .insert([
          {
            email: data.email.toLowerCase().trim(),
            verified: false,
            subscribed: true,
          },
        ]);

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          setModalState({
            isOpen: true,
            type: 'error',
            title: 'Already Subscribed',
            message: 'This email is already on our mailing list. We look forward to seeing you soon!',
          });
        } else {
          throw error;
        }
      } else {
        setModalState({
          isOpen: true,
          type: 'success',
          title: 'Welcome to St. Denis!',
          message: 'Thank you for joining our mailing list. We\'ll keep you updated on our grand opening and special events!',
        });
        reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Oops!',
        message: 'Something went wrong. Please try again later or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl mx-auto space-y-4 md:space-y-6">
        {/* Email Field */}
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="email@example.com"
            className={`w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl rounded-full border-2 bg-white text-st-denis-burgundy placeholder:text-st-denis-burgundy/40 focus:outline-none focus:ring-2 focus:ring-st-denis-burgundy transition-all ${
              errors.email ? 'border-red-400' : 'border-st-denis-burgundy/30'
            }`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm md:text-base text-red-600">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-st-denis-burgundy text-st-denis-cream py-3 md:py-4 px-6 md:px-8 text-base md:text-lg lg:text-xl rounded-full hover:bg-st-denis-burgundy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium tracking-wide uppercase"
        >
          {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
        </button>
      </form>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  );
};
