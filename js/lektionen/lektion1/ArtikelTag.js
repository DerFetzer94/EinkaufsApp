class ArtikelTag extends React.Component {
    render = () => {
        return (
            <div>
                <dd><label><input type="checkbox" checked={this.props.gekauft}/>
                    {this.props.gekauft ? <s>{this.props.artikel.name}</s> : this.props.artikel.name}
                </label></dd>
            </div>
        )
    }
}
