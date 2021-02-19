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
                    title: 'Rent your equipment',
                    intro: 'Are you missing any equipment? No worries, we have a variaty of equipment for rent. Contact us on info@naturlogi.se for questions regarding equipment.'
                },
                checkout: {
                    approve: "You need to approve the terms before you can check out.",
                    tocheckout: "Go to checkout"
                },
                toast: {
                    down: "Go down to see your booking and checkout",
                    warning: {
                        general: "Something went wrong with your booking, contact info@naturlogi.se to make a manual booking.",
                        date: "Start date cannot be in the past",
                        range: "Contact info@naturlogi.se to book a longer stay than 14 days.",
                        klarna: "Something went wrong in the communication with Klarnra, contact info@naturlogi.se to make a manual booking."
                    }
                }
            },
        },
        sv: {
            translation: {
                intro: 'Här kan du boka din Naturlogi, välj först vilket boende du önskar och sedan kan du välja till de olika markorgarna och övrigt. Barn under 15 år kostar 150kr, ange i övrigt rutan innan du slutför bokningen och betala för detta på plats.',
                introLodging: 'Välkommen till våra lägerplatser! Här sover du i tält eller i vår mysiga Glamping i vindskyddet. Du bokar boende genom att välja datum.',
                food: {
                    title: 'Matkorgar',
                    intro: 'För din vistelse finns en rad olika alternativ när det gäller mat. Här kan du köpa till det som passar dig. Vi har allt från småtugg till middagar och efterrätter.',
                    dinner: 'Våra middagar är lokalproducerade och ansvarsfullt komponerade. Allt är förberett för dig att tillaga själv över öppen eld.'
                },
                other: {
                    title: "Övrigt"
                },
                rentals: {
                    title: 'Hyra utrustning',
                    intro: 'Saknar du utrustning? Inga problem! Hos oss kan du hyra det mesta. Kontakta oss på info@naturlogi.se för frågor angående utrustningen.'
                },
                checkout: {
                    approve: "Du måste godkänna bokningsvillkoren innan du kan checka ut.",
                    tocheckout: "Gå till kassa"
                },
                toast: {
                    down: "Gå ner för att se din bokning och gå till kassan",
                    warning: {
                        general: "Något gick fel med bokningen, kontakta info@naturlogi.se för att genomföra din bokning.",
                        date: "Start datum måste vara framåt i tiden.",
                        range: "Kontakta info@naturlogi.se för att boka en längre vistelse än 14 dagar.",
                        klarna: "Något gick snett i kommunikationen med Klarna, kontakt info@naturlogi.se för att göra en manuell bokning."
                    }
                }
            },
        },
    },
});
export default i18next;
