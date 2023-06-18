import { z, ZodType } from 'zod';
import i18next from 'i18next';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/he/zod.json';

// Apply translation messages to each validation rule
export const applyTranslations = (rule: z.ZodTypeAny) => {
  return rule.transform((val) => {
    if (val instanceof z.ZodObject) {
      return new z.ZodObject({
        ...val.shape(),
        ...Object.entries(val.shape()).reduce((acc, [key, value]) => {
          return {
            ...acc,

            [key]: applyTranslations(value as z.ZodTypeAny).message(zodI18nMap[key])
          };
        }, {})
      });
    }
    return val;
  });
};

i18next.init({
  lng: 'he',
  resources: {
    he: { zod: translation }
  }
});

// Set the global translation messages for Zod
z.setErrorMap(zodI18nMap);
