import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo-gso3.png';
import { checkPasswordStrength } from '@/utils/password';
import backgroundImage from '@/assets/Background.png'
import { createUser } from '../api/userApi'
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute('/register')({
    component: RouteComponent,
});

function RouteComponent() {
    const { t } = useTranslation();
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [form, setForm] = useState({
        company: '',
        contact: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const register = useMutation({
  mutationFn: (data) =>
    createUser(
      data.email,
      data.company,
      data.contact,
      data.password
    ),
});

    const passwordRules = checkPasswordStrength(form.password);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
const isFormComplete =
  form.company.trim() !== '' &&
  form.contact.trim() !== '' &&
  form.email.trim() !== '' &&
  form.password !== '' &&
  form.passwordConfirm !== '';
const isPasswordValid =
  passwordRules.length &&
  passwordRules.uppercase &&
  passwordRules.number;
const isFormValid =
  isFormComplete &&
  isPasswordValid &&
  form.password === form.passwordConfirm &&
  acceptedPrivacy 
const handleSubmit = (e) => {
  e.preventDefault();
  setError("");
 
  // Formular vollständig?
  if (!isFormValid) return;
 
  // Passwortgleichheit prüfen
  if (form.password !== form.passwordConfirm) {
    setError(t("errors.passwordMismatch"));
    return;
  }
 
  // Passwortstärke prüfen
  if (
    !passwordRules.length ||
    !passwordRules.uppercase ||
    !passwordRules.number
  ) {
    setError(t("errors.passwordNotStrong"));
    return;
  }
 
  // Registrierung ausführen
  register.mutate(
    {
      email: form.email,
      company: form.company,
      contact: form.contact,
      password: form.password,
    },
    {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (err) => {
        setError(err?.response?.data?.message ||t("errors.registrationFailed"));
      },
    }
  );
};
    if (isSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-5" 
                        style={{
                backgroundImage:
                    `linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)),   url(${backgroundImage})`
                ,
            }}>
                <div className="w-full max-w-[430px] overflow-hidden rounded-[10px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                    <div className="bg-primary p-[25px] text-center text-white">
                        <img src={logo} alt={t('common.logoAlt')} className="mx-auto mb-1.5 w-[120px]" />
                        <span className="block text-sm uppercase tracking-[2px]">{t('common.marketplace')}</span>
                    </div>

                    <div className="mt-[15px] flex items-center justify-center">
                        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary text-sm text-white">
                            1
                        </div>
                        <div className="h-1 w-20 bg-primary"></div>
                        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary text-sm text-white">
                            2
                        </div>
                    </div>
                    <p className="text-center text-sm text-[#7a7a7a]">{t('auth.step', { current: 2, total: 2 })}</p>

                    <div className="p-[30px] text-center">
                        <div className="mx-auto mb-[15px] flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#8bc34a] text-4xl text-white">
                            ✔
                        </div>
                        <h1 className="text-text">{t('auth.registrationSuccess')}</h1>
                        <p className="text-muted">{t('auth.registrationSuccessMessage')}</p>
                        <Link
                            to="/login"
                            className="mt-[10px] inline-block w-full rounded-md bg-primary px-4 py-[14px] text-base text-white no-underline"
                        >
                            {t('auth.goToLogin')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-5"
            style={{
                backgroundImage:
                    `linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)),   url(${backgroundImage})`
                ,
            }}
        >
            <div className="w-full max-w-[430px] overflow-hidden rounded-[10px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                <div className="bg-primary p-[25px] text-center text-white">
                    <img src={logo} alt={t('common.logoAlt')} className="mx-auto mb-1.5 w-[120px]" />
                    <span className="block text-sm uppercase tracking-[2px]">{t('common.marketplace')}</span>
                </div>

                <div className="mt-[15px] flex items-center justify-center">
                    <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary text-sm text-white">
                        1
                    </div>
                    <div className="h-1 w-20 bg-primary"></div>
                    <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#d0d7e2] text-sm text-white">
                        2
                    </div>
                </div>
                <p className="text-center text-sm text-[#7a7a7a]">{t('auth.step', { current: 1, total: 2 })}</p>

                <div className="p-[30px] text-center">
                    <h1 className="text-text">{t('auth.companyRegistration')}</h1>
                    <p className="text-muted">{t('auth.companyRegistrationDescription')}</p>

                    <form onSubmit={handleSubmit}>
                        {error && <div className="mb-4 text-red-500">{error}</div>}

                        <div className="relative mb-[15px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">🏢</span>
                            <input
                                name="company"
                                placeholder={t('auth.companyName')}
                                value={form.company}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-[#ccc] py-3 pl-[42px] pr-[14px] focus:border-primary focus:outline-none"
                            />
                        </div>

                        <div className="relative mb-[15px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">👤</span>
                            <input
                                name="contact"
                                placeholder={t('auth.contactPerson')}
                                value={form.contact}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-[#ccc] py-3 pl-[42px] pr-[14px] focus:border-primary focus:outline-none"
                            />
                        </div>

                        <div className="relative mb-[15px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">📧</span>
                            <input
                                type="email"
                                name="email"
                                placeholder={t('common.email')}
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-[#ccc] py-3 pl-[42px] pr-[14px] focus:border-primary focus:outline-none"
                            />
                        </div>

                        <h3 className="text-text">{t('auth.createPassword')}</h3>

                        <div className="relative mb-[15px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">🔒</span>
                            <input
                                type="password"
                                name="password"
                                placeholder={t('common.password')}
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-[#ccc] py-3 pl-[42px] pr-[14px] focus:border-primary focus:outline-none"
                            />
                        </div>

                        <div className="relative mb-[15px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">🔒</span>
                            <input
                                type="password"
                                name="passwordConfirm"
                                placeholder={t('auth.confirmPassword')}
                                value={form.passwordConfirm}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-[#ccc] py-3 pl-[42px] pr-[14px] focus:border-primary focus:outline-none"
                            />
                        </div>

                        <div className="my-[10px] mb-[15px] text-left text-[13px] text-[#a0a0a0]">
                            <p className={passwordRules.length ? 'font-semibold text-[#2e7d32]' : ''}>
                                • {t('auth.passwordMinLength')}
                            </p>
                            <p className={passwordRules.uppercase ? 'font-semibold text-[#2e7d32]' : ''}>
                                • {t('auth.passwordUppercase')}
                            </p>
                            <p className={passwordRules.number ? 'font-semibold text-[#2e7d32]' : ''}>
                                • {t('auth.passwordNumber')}
                            </p>
                        </div>
                        <div className="mb-[15px] text-left text-sm">
                        <label className="flex items-start gap-2">
                            <input type="checkbox"checked={acceptedPrivacy}onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                            className="mt-1"
                            />
                            <span className="text-[#7a7a7a]">
                            Ich habe die{' '}
                            <Link to="/datenschutz"target="_blank"className="text-primary underline"      >
                                Datenschutzerklärung
                            </Link>{' '}
                            gelesen und stimme der Verarbeitung meiner Daten gemäß DSGVO zu.
                            </span>
                        </label>
                        </div>
                                                <button
                        type="submit"  disabled={!isFormValid}  className={`
                            mt-[10px] w-full rounded-md border-none px-4 py-[14px] text-base
                            ${
                            isFormValid
                                ? 'bg-primary text-white hover:bg-primary-dark cursor-pointer'        : 'bg-[#d0d7e2] text-[#7a7a7a] cursor-not-allowed'    }
                        `}
                        >
                        Registrieren
                        </button>
                                            
                    </form>

                    <div className="mt-4 text-sm text-muted">
                        {t('auth.hasAccount')}{' '}
                        <Link to="/login" className="font-semibold text-primary no-underline hover:underline">
                            {t('auth.loginNow')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
