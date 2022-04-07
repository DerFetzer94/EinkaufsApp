class GruppenTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aufgeklappt: true
        }
    }

    /**
     * Hier wird ein artikel aus der Liste entfernt
     * @param artikelNamen - der artikelname der entfernt werden soll
     */
    artikelEntfernen = (artikelNamen) => {
        this.props.gruppe.artikelEntfernen(artikelNamen)
        this.props.aktiveGruppeHandler(this.props.gruppe.id)
    }

    /**
     * Hiermit werden die jeweiligen Gruppen auf und zugeklappt
     */
    aufZuKlappen() {
        this.setState({aufgeklappt: !this.state.aufgeklappt})
    }

    /**
     * implemintiert den html code in react
     * @returns {JSX.Element}
     */
    render = () => {
        let itemsRelevant = this.props.gruppe.artikelListe.filter(item => item.gekauft == this.props.erledigt)
        return (
            <div>
                <dt onClick={() => this.props.aktiveGruppeHandler(this.props.gruppe.id)}
                    className={!this.props.erledigt && this.props.aktiv ? "aktiv" : "inaktiv"}>
                    {this.props.gruppe.name}
                    <i onClick={() => this.aufZuKlappen()} className="material-icons">
                        {this.state.aufgeklappt ? 'expand_more' : 'expand_less'}
                    </i>
                </dt>
                {this.state.aufgeklappt
                    ? itemsRelevant.map(artikel =>
                        <ArtikelTag key={artikel.id} artikel={artikel}
                                    checkHandler={this.props.checkHandler}
                                    artikelEntfernen={this.artikelEntfernen}/>)
                    : ''
                }
            </div>
        )
    }
}