class ShoppingTag extends React.Component {
    constructor(props) {
        super(props);
        let gruppeObstGemüse = App.gruppeHinzufuegen("Obst & Gemüse")
        gruppeObstGemüse.artikelHinzufuegen("Banane", "Äpfel", "Brokkoli")

        let gruppeGetränke = App.gruppeHinzufuegen("Getränke")
        gruppeGetränke.artikelHinzufuegen("Energy", "Fanta", "Sprite")

        let gruppeMilchprodukte = App.gruppeHinzufuegen("Milchprodukte")
        gruppeMilchprodukte.artikelHinzufuegen("Hafermilch", "Schlagsahne", "Joghurt")

    }
    render = () => {
        return (
            <div>
                <header>
                    <h1>Einkaufsliste</h1>
                    <nav>
                        <label>
                            <input type="text" placeholder="Artikel hinzufügen"/>
                        </label>
                        <button className="material-icons">add_circle</button>
                    </nav>
                </header>
                <hr/>
                <main>
                    <section>
                        <h2>Einkaufen<i className="material-icons">expand_less</i></h2>
                        <dl>
                            {App.gruppenListe.map(gruppe => (
                                <GruppenTag key={gruppe.id} gruppe={gruppe} erledigt={false}/>
                            ))}
                        </dl>
                    </section>
                    <hr/>
                    <section>
                        <h2>
                            <dt>Erledigt</dt>
                        </h2>
                        <dl>
                            {App.gruppenListe.map(gruppe => (
                                <GruppenTag key={gruppe.id} gruppe={gruppe} erledigt={true}/>
                            ))}
                            <GruppenTag/>
                        </dl>
                    </section>
                </main>
                <hr/>
                <footer>
                    <nav>
                        <button onClick="document.location='gruppen.html'">
                            <span className="material-icons">bookmark_add</span>Gruppen
                        </button>
                        <button onClick="document.location='sortieren.html'">
                            <span className="material-icons">sort</span>Sortieren
                        </button>
                        <button onClick="document.location='einstellungen.html'">
                            <span className="material-icons">settings</span>Einstellungen
                        </button>
                        <br/>
                    </nav>
                </footer>
            </div>
        )
    }
}
