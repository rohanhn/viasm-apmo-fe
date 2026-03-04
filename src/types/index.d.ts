// Global type overrides

// Override i18next types
declare module 'i18next' {
  export interface TFunction {
    (key: string, options?: any): string;
    (key: string, defaultValue?: string, options?: any): string;
  }

  export interface I18n {
    t: TFunction;
    changeLanguage: (lng: string) => Promise<TFunction>;
    language: string;
    languages: string[];
    init: (options?: any) => Promise<TFunction>;
    use: (module: any) => I18n;
  }

  const i18next: I18n;
  export default i18next;
}

// Override react-i18next types
declare module 'react-i18next' {
  export interface TFunction {
    (key: string, options?: any): string;
    (key: string, defaultValue?: string, options?: any): string;
  }

  export function useTranslation(ns?: string): {
    t: TFunction;
    i18n: any;
    ready: boolean;
  };

  export function initReactI18next(): any;

  export interface Trans {
    i18nKey?: string;
    defaults?: string;
    values?: any;
    components?: any;
    t?: TFunction;
  }
}
