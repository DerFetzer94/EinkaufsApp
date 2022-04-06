/**
 * Diese Komponent stellt einen Artikel dar, den man abhacken und reaktivieren kann
 * 
 */
class ArtikelTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            newName: this.props.artikel.name
        }
    }

    handleChange(event) {
        this.setState({newName: event.target.value})
    }

    /**
     * Hier wird der artikel umbenannt
     * @param artikel - der "artikel" wird umbenannt
     * @param {Event.KEYPRESS} event - die zuletzt gedrückte Taste
     */
    artikelUmbenennen(artikel, event) {
        if (event && event.key != "Enter") return
        artikel.name = this.state.newName
        this.setState({isEditing: false})
        App.informieren(artikel.name + " wurde umbenannt")
    }

    render = () => {
        const artikel = this.props.artikel

        const viewTemplate = (
            <dd>
                <label><input type="checkbox" 
                              onChange={() => this.props.checkHandler(this.props.artikel)}
                              checked={this.props.artikel.gekauft}/>
                    {this.props.artikel.gekauft ? <s>{this.props.artikel.name}</s> : this.props.artikel.name}
                </label>
                <i className="material-icons"
                   onClick={() => this.setState({isEditing: true})}>edit </i>
                <i className="material-icons"
                   onClick={() => this.props.artikelEntfernen(this.props.artikel.name)}>delete</i>
            </dd>
        )
        const editTemplate = (
            <dd>
                <input type="search" value={this.state.newName} autoFocus={true}
                       onChange={event => this.handleChange(event)}
                       onKeyPress={event => this.artikelUmbenennen(artikel, event)}/>
                <i className="material-icons"
                   onClick={() => this.setState({isEditing: false})}>cancel </i>
                <i className="material-icons"
                   onClick={() => this.artikelUmbenennen(artikel)}>check_circle </i>
            </dd>
        )

        return (
            this.state.isEditing
                ? editTemplate
                : viewTemplate
        )
    }
}
