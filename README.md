# MeteoApp

Applicazione meteo scritta in React per il progetto della settimana 10.

Si cerca una città, se ne guarda il meteo attuale e si apre una pagina di dettaglio con la mappa. Facendo l'accesso si può personalizzare la home, scegliendo quali città tenere sott'occhio.

I dati arrivano da [Open-Meteo](https://open-meteo.com/), che è gratuita e non richiede una chiave API. Le mappe sono embed pubblici di [Windy](https://www.windy.com/).

## Cosa fa

- **Home**: le mie città salvate, ognuna con temperatura, condizioni e vento, più una mappa delle onde sull'Italia.
- **Ricerca**: cerco una città per nome e ottengo fino a cinque risultati, ognuno con il meteo già caricato.
- **Dettaglio**: temperatura, velocità e direzione del vento, coordinate, e la mappa centrata su quella città.
- **Login**: una volta dentro posso aggiungere e togliere città dalla home, anche direttamente dai risultati di ricerca.

Le città salvate e l'accesso restano in `localStorage`, quindi sopravvivono al ricaricamento della pagina.

## Avviare il progetto

```bash
npm install
npm run dev
```

L'app parte su `http://localhost:5173`.

Gli altri comandi:

```bash
npm run build     # build di produzione in dist/
npm run preview   # serve la build appena creata
npm run lint      # ESLint su tutto il progetto
```

## Login

| Campo       | Valore      |
| ----------- | ----------- |
| Nome utente | `gabriele`  |
| Password    | `meteo2026` |

> **Questo non è un vero login.** Le credenziali sono scritte in chiaro in `src/context/AuthProvider.jsx`, finiscono nel bundle JavaScript e chiunque apra gli strumenti di sviluppo può leggerle. Il controllo avviene nel browser, quindi basta una riga in console per aggirarlo. È un esercizio su context e interfaccia condizionale, non un meccanismo di sicurezza: per quello servono un server che verifichi le credenziali e un token di sessione.

## Le route

| Percorso            | Pagina                                     |
| ------------------- | ------------------------------------------ |
| `/` e `/home`       | Home                                       |
| `/search?q=<città>` | Risultati della ricerca                    |
| `/details/:nome`    | Dettaglio di una città                     |
| `/profilo`          | Profilo utente, con il pulsante per uscire |
| `/login`            | Modulo di accesso                          |
| qualsiasi altro     | Pagina 404                                 |

La ricerca tiene la query nell'URL invece che in uno stato interno: così il link ai risultati è condivisibile e il tasto "indietro" del browser funziona come ci si aspetta.

## Com'è organizzato

```
src/
  api/meteo.js              chiamate a Open-Meteo (geocoding + meteo attuale)
  components/               un componente per file, con il suo CSS accanto
    Nav, SearchBar, Home, MeteoCard, Search, Details, Profilo, Login, NotFound
  context/
    auth.js, AuthProvider.jsx      utente autenticato
    citta.js, CittaProvider.jsx    lista delle città della home
  utils/
    condizioneMeteo.js      codice meteo WMO -> icona + descrizione
    mappaWindy.js           costruisce l'URL della mappa
  index.css                 palette e stili globali
```

Ogni context è diviso in due file: uno con il context e il suo hook, uno con il componente provider. Serve perché un modulo che esporta sia componenti sia funzioni rompe l'aggiornamento a caldo di Vite, e infatti ESLint se ne lamenta.

**I colori stanno tutti in `:root`.** Palette costruita attorno al verde acqua dello sfondo, con le tonalità raccolte in variabili CSS: cambiare tinta significa modificare una riga sola. Ho verificato che ogni combinazione di testo e sfondo superi il rapporto di contrasto 4.5:1 richiesto da WCAG AA. Sullo sfondo verde l'accento normale non bastava, quindi i link appoggiati direttamente sulla pagina usano una variante più scura.

**Le icone delle condizioni sono descritte, non nascoste.** Il sole o la nuvola dicono qualcosa che il testo accanto non ripete, quindi hanno `role="img"` e `aria-label`. Le icone puramente decorative, come la freccia del link "indietro", hanno invece `aria-hidden` per non essere annunciate due volte dai lettori di schermo.

**La home usa `Promise.allSettled`, non `Promise.all`.** Se una delle città salvate non viene trovata, le altre continuano a comparire e un avviso segnala solo quella mancante. Con `Promise.all` sarebbe sparita l'intera pagina.

**Il pulsante sulla card sta fuori dal link.** Un `<button>` dentro un `<a>` è HTML non valido e il click aprirebbe comunque il dettaglio: il pulsante è un fratello del link, sovrapposto con `position: absolute`.

**Il link "indietro" sa da dove vieni.** La card passa la pagina di partenza nello state della navigazione, così dal dettaglio si torna alla home o ai risultati di ricerca a seconda di dove si è cliccato. Aprendo un dettaglio da un link diretto, dove quello stato non esiste, si torna alla home.
