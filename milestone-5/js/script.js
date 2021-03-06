// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) 
// e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, 
// visualizzare nome e immagine di ogni contatto

// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi 
// al contatto attivo all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene 
// aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, 
// che apparirà dopo 1 secondo.

// Milestone 4
// opzionale per oggi:
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome 
// contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// BONUS:
// Milestone 5
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti.


Vue.config.devtools = true;

const app = new Vue(
    {
        el: '#root',
        data: {
            activeContact: 0,
            newMessageText:'',
            searchContact: '',
            activeMessage: null,
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent',
                            isActive: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent',
                            isActive: false
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received',
                            isActive: false
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent',
                            isActive: false
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received',
                            isActive: false
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent',
                            isActive: false
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received',
                            isActive: false
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent',
                            isActive: false
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received',
                            isActive: false
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent',
                            isActive: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received',
                            isActive: false
                        }
                    ],
                },
            ]
            
        },
        methods: {
           changeContact: function (index) {
               this.activeContact = index;
               this.activeMessage = null;
            },
           sendNewMessage: function () {
                if (this.newMessageText.trim().length > 0) {
                    const newMessage = {
                        text: this.newMessageText,
                        date: this.getCurrentDate (),
                        status: 'sent',
                        isActive: false
                    }

                    this.contacts[this.activeContact].messages.push(newMessage);
                    this.newMessageText='';

                    setTimeout(() => {
                        const receivedMessage = {
                            text: 'ok',
                            date: this.getCurrentDate (),
                            status: 'received',
                            isActive: false
                        }
        
                        this.contacts[this.activeContact].messages.push(receivedMessage);
                    } ,1000);
                };
            },
            filterContact: function () {
                this.contacts.forEach((contact) => {
                  if (contact.name.toLowerCase().includes(this.searchContact.trim().toLowerCase())){
                      contact.visible= true;
                  } else{
                      contact.visible= false;
                  }
                })
            },
            getCurrentDate () {
                return dayjs().format("DD/MM/YYYY HH:mm:ss")
            },
            showSubList: function (index){
                if (index === this.activeMessage){
                    this.activeMessage = null;
                }else {
                    this.activeMessage = index;
                }
            },
            deleteMessage: function (index) {
                this.contacts[this.activeContact].messages.splice(index, 1);
                this.activeMessage = null;
            },
            getContactLastMessageDate: function(contact){
                const contactMessages = contact.messages;
                return contactMessages[contactMessages.length-1].date;
            },
            getContactLastMessageText: function(contact) {
                const contactMessages = contact.messages;
                const lastMessageText = contactMessages[contactMessages.length-1].text;

                let cutMessageText = lastMessageText.slice(0, 20);

                if (cutMessageText.length > 19) {
                    cutMessageText += '...';
                }

                return cutMessageText;
            }
        }
    }
);