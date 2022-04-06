/**
 * Diese Klasse steuert das Modell der ShoppingList
 * @property {string} STORAGE_KEY Name des Eintrags im LocalStorage
 * @property {Gruppe[]} gruppenListe enthält die Artikelgruppen
 * @propertu {number} aktiveGruppe enthält die ID der aktuell ausgewählten Gruppe
 * @property (boolean} meldungenAusgeben steuert, ob eine Meldung ausgegeben werden soll oder nicht
 */
class App {
  static STORAGE_KEY = "einkaufslisteDaten"
  static gruppenListe = []
  static aktiveGruppe = null
  static meldungenAusgeben = true

  /**
   * Sucht eine Gruppe nach der ID und liefert es als Objekt zurück
   * @param {number} gruppenId - ID der gesuchten Gruppe
   * @returns {null|Gruppe} gefundeneGruppe - die gefundene Gruppe, gibt 'null' wenn nichts gefunden wurde
   */
  static gruppeFinden(gruppenId) {
    const gefundeneGruppen = this.gruppenListe.filter((gruppe) => gruppe.id == gruppenId)
    if (gefundeneGruppen.length > 0) {
      return gefundeneGruppen[0]
    } else {
      App.informieren(`[App] Gruppe "${gruppenId}" nicht gefunden`, true)
      return null
    }
  }

  /**
   * Fügt eine Gruppe in der Gruppenliste hinzu
   * @param name - der Name der Gruppe z.B. 'Obst' wird hinzugefügt
   * @returns {Gruppe} - gibt eine erstellte Gruppe zurück
   */
  static gruppeHinzufuegen(name) {
    const gleicheGruppen = this.gruppenListe.filter(gruppe => gruppe.name == name)
    // keine Gruppe mit diesem Namen vorhanden
    if (gleicheGruppen.length == 0) {
      let neueGruppe = new Gruppe(name, this.gruppenListe.length)
      this.gruppenListe.push(neueGruppe)
      App.informieren(`[App] Gruppe "${neueGruppe.name}" hinzugefügt`)
      this.aktiveGruppe = neueGruppe.id
      return neueGruppe
    } else {
      App.informieren(`[App] Gruppe "${name}" existiert schon!`, true)
    }
  }

  /**
   * Hier wird die Gruppe mit der ID der 'gruppenId' umbenannt
   * @param {number} gruppenId - ID der Gruppe
   * @param neuerName - der neue Name der Gruppe
   */
  static gruppeUmbenennen(gruppenId, neuerName) {
    let gruppe = this.gruppeFinden(gruppenId)
    if (gruppe) {
      App.informieren(`[App] Gruppe "${gruppe.name}" umbenannt in "${neuerName}"`)
      gruppe.name = neuerName

    }
  }

  /**
   * Hier wird eine bereits erstellte Gruppe mit der 'gruppenId' gelöscht 
   * @param {number} gruppenId - ID der Gruppe
   */
  static gruppeEntfernen(gruppenId) {
    let gruppe = this.gruppeFinden(gruppenId)
    if (gruppe) {
      let index = this.gruppenListe.indexOf(gruppe)
      // alle Artikel dieser Gruppe entfernen
      gruppe.artikelListe.map((artikel) => gruppe.artikelEntfernen(artikel))
      this.gruppenListe.splice(index, 1)
      App.informieren(`Gruppe "${gruppe.name}" entfernt`)
    } else {
      App.informieren(`Gruppe "${gruppenId}" konnte NICHT entfernt werden`, true)
    }
  }

  static allesAuflisten() {
    this.informieren("\nEinkaufsliste              ^")
    this.informieren("----------------------------")
    this.gruppenListe.map(gruppe => {
      console.debug(`[${gruppe.name}]`)
      gruppe.artikelAuflisten(false)
    })
    console.debug()
  }

  static async datenEinlesen(dateiname = "js/startzustand.json") {
    const response = await fetch(dateiname)
    const daten = await response.json()
    this.initialisieren(daten)
  }

  static initialisieren(jsonDaten) {
    this.gruppenListe = []
    jsonDaten.gruppenListe.map(gruppe => {
      let neueGruppe = this.gruppeHinzufuegen(gruppe.name)
      gruppe.artikelListe.map(artikel => {
        neueGruppe.artikelObjektHinzufuegen(artikel)
      })
    })
    this.aktiveGruppe = jsonDaten.aktiveGruppe
  }

  static stummschalten() {
    this.meldungenAusgeben = false
  }

  static lautschalten() {
    this.meldungenAusgeben = true
  }

  static speichern() {
    const json = {
      gruppenListe: this.gruppenListe,
      aktiveGruppe: this.aktiveGruppe,
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(json))
  }

  static laden() {
    let daten = JSON.parse(localStorage.getItem(this.STORAGE_KEY))
    this.initialisieren(daten)
  }

  static informieren(nachricht, istWarnung) {
    if (this.meldungenAusgeben) {
      if (istWarnung) {
        console.warn(nachricht)
      } else {
        console.debug(nachricht)
        this.speichern()
      }
    }
  }
}

