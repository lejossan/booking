import i18next from 'i18next';

// import common_sv from "./translations/sv/common.json";
// import common_en from "./translations/en/common.json";

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',                              // language to use
    resources: {
        en: {
            translation: {
                intro: 'Here you can book your Naturlogi, first choose which accommodation you want and then you can choose for the different food packages.',
                introLodging: 'You book accommodation by selecting dates.',
                food: {
                    title: 'Foodbaskets',
                    intro: 'For your stay there are a variety of options when it comes to food. Here you can buy what suits you.',
                },
                rentals: {
                    title: 'Experience',
                    intro: 'During your stay with us you can also rent our canoe which is located in the iron grove which has many nice islands to visit. You have access to the canoe all day.'
                }
            },
        },
        sv: {
            translation: {
                intro: 'Här kan du boka din Naturlogi, välj först vilket boende du önskar och sedan kan du välja till de olika matpaketen.',
                introLodging: 'Du bokar boende genom att välja datum.',
                food: {
                    title: 'Matkorgar',
                    intro: 'För din vistelse finns en rad olika alternativ när det gäller mat. Här kan du köpa till det som passar dig.',
                },
                other: {
                    title: "Övrigt"
                },
                rentals: {
                    title: 'Hyra utrustning',
                    intro: 'Saknar du utrustning? Inga problem! Hos oss kan du hyra det mesta.'
                }
            },
        },
    },
});
export default i18next;
