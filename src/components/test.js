function showtimein() {

    return (
        <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex3, ...styles.timedisplay - container, ...styles.regularFont }}>
                                {this.timeinheader()}
                            </div>
                            <div style={{ ...styles.flex1, ...styles.timedisplay - container, ...styles.alignCenter }}>
                                <button style={{ ...styles.generalButton, ...styles.majorDownIcon }} onClick={() => { this.activetimeincalendar() }}>{majorDownIcon()}</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.timecell - container }}>

                        <div style={{
                            ...styles.timecell - module ...styles.showBorder, ...styles.alignCenter >
                                <button className="general-button time-button" onClick={event => { this.timeinmonthup(event) }}>{DateArrowUp()}</button>
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <input type="text" className="timeinput-field ...styles.alignCenter titleFont" value={this.gettimeinmonth()} />
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <button className="general-button time-button" onClick={event => { this.timeinmonthdown(event) }}> {DateArrowDown()}</button>
                        </div>

                    </div>

                    <div className="flex1 showBorder timecell-container ...styles.alignCenter">
                        <div className="timecell-module showBorder">
                            <button className="general-button time-button" onClick={event => { this.increasetimeinbyinc(event, (1000 * 60 * 60 * 24)) }}>{DateArrowUp()}</button>
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <input type="text" className="timeinput-field ...styles.alignCenter titleFont" value={this.gettimeinday()} />
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <button className="general-button time-button" onClick={event => { this.decreasetimeinbyinc(event, (1000 * 60 * 60 * 24)) }}> {DateArrowDown()}</button>
                        </div>

                    </div>
                    <div className="flex1 showBorder timecell-container ...styles.alignCenter">
                        <div className="timecell-module showBorder">
                            <button className="time-button general-button" onClick={event => { this.timeinyearup(event) }}>{DateArrowUp()}</button>
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <input type="text" className="timeinput-field ...styles.alignCenter titleFont" value={this.gettimeinyear()} />
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <button className="time-button general-button" onClick={event => { this.timeinyeardown(event) }}> {DateArrowDown()}</button>
                        </div>
                    </div>

                    <div className="flex1 showBorder timecell-container">
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <button className="time-button general-button ...styles.alignCenter" onClick={event => { this.increasetimeinbyinc(event, (1000 * 60 * 60)) }}>{DateArrowUp()}</button>
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <input type="text" className="timeinput-field ...styles.alignCenter titleFont" value={this.gettimeinhours()} />
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <button className="time-button general-button ...styles.alignCenter" onClick={event => { this.decreasetimeinbyinc(event, (1000 * 60 * 60)) }}> {DateArrowDown()}</button>
                        </div>
                    </div>

                    <div className="flex1 showBorder timecell-container">
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <button className="time-button general-button ...styles.alignCenter" onClick={event => { this.increasetimeinbyinc(event, (1000 * 60)) }}>{DateArrowUp()}</button>
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <input type="text" className="timeinput-field ...styles.alignCenter titleFont" value={this.gettimeinminutes()} />
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <button className="time-button general-button ...styles.alignCenter" onClick={event => { this.decreasetimeinbyinc(event, (1000 * 60)) }} > {DateArrowDown()}</button>
                        </div>
                    </div>
                    <div className="flex1 showBorder timecell-container ...styles.alignCenter">
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <button className="time-button general-button ...styles.alignCenter" onClick={() => { this.toggletimeinampm("up") }}>{DateArrowUp()}</button>
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <input type="text" className="timeinput-field ...styles.alignCenter titleFont" value={this.gettimeinampm()} />
                        </div>
                        <div className="timecell-module showBorder ...styles.alignCenter">
                            <button className="time-button general-button ...styles.alignCenter" onClick={() => { this.toggletimeinampm("down") }}> {DateArrowDown()}</button>
                        </div>
                    </div>
                </div>

                {this.handlecalendartimein()}


            </div>
        </div>
    )
}