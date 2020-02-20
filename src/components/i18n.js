import i18next from 'i18next';

// import common_sv from "./translations/sv/common.json";
// import common_en from "./translations/en/common.json";

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',                              // language to use
    resources: {
        en: {
            translation: {
                intro: 'Here you can book your Naturlogi, first choose which accommodation you want and then you can choose for the different food packages. You book accommodation by selecting dates and entering the number of people.',
                food: {
                    title: 'Foodpackage',
                    intro: 'For your stay there are a variety of options when it comes to food. Do you want to get everything ready or do you want to cook your own food over an open fire. Here you can buy what suits you.',
                },
            },
        },
        sv: {
            translation: {
                intro: 'Här kan du boka din Naturlogi, välj först vilket boende du önskar och sedan kan du välja till de olika matpaketen. Du bokar boende genom att välja datum och skriva in antal personer.',
                food: {
                    title: 'Matpaket',
                    intro: 'För din vistelse finns en rad olika alternativ när det gäller mat. Vill du få allt färdigt eller vill du laga din egen mat över öppen eld. Här kan du köpa till det som passar dig.',
                },
            },
        },
    },
});
export default i18next;
