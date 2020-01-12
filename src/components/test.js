function showtimeout() {
    let Timeout = new TimeOut();
    let timeoutheader = Timeout.gettimeoutheader.call(this);
    const styles = MyStylesheet();
    const regularFont = this.getRegularFont();
    const maxWidth = styles.calendarContainer;
    return (<div style={{ ...styles.generalFlex, ...maxWidth }}>
        <div style={{ ...styles.flex1, ...styles.generalFont }}>

            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex3, ...regularFont, ...styles.generalFont }}>
                    {timeoutheader}
                </div>
                <div style={{ ...styles.flex1, ...styles.timedisplayContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...styles.majorDownIcon }} onClick={() => { Timeout.activetimeoutcalendar.call(this) }}>{majorDownIcon()}</button>
                </div>
            </div>

            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.timedisplayContainer, ...styles.alignCenter }}>

                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={() => { Timeout.timeoutmonthup.call(this) }}>{DateArrowUp()}</button>
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <input type="text" style={{ ...styles.generalField, ...styles.timeoutputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeoutmonth.call(this)} />
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={event => { Timeout.timeoutmonthdown.call(this) }}> {DateArrowDown()}</button>
                    </div>

                </div>

                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...styles.timecellContainer }}>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex }}>
                        <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={() => { Timeout.increasetimeoutbyinc.call(this, (1000 * 60 * 60 * 24)) }}>{DateArrowUp()}</button>
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeoutday.call(this)} />
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={() => { Timeout.decreasetimeoutbyinc.call(this, (1000 * 60 * 60 * 24)) }}> {DateArrowDown()}</button>
                    </div>

                </div>
                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...styles.timecellContainer }}>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex }}>
                        <button style={{ ...styles.timeButton, ...styles.generalButton }} onClick={() => { Timeout.timeoutyearup.call(this) }}>{DateArrowUp()}</button>
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeoutyear.call(this)} />
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <button style={{ ...styles.timeButton, ...styles.generalButton }} onClick={() => { Timeout.timeoutyeardown.call(this) }}> {DateArrowDown()}</button>
                    </div>
                </div>

                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.timedisplayContainer }}>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.increasetimeoutbyinc.call(this, (1000 * 60 * 60)) }}>{DateArrowUp()}</button>
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeouthours.call(this)} />
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.decreasetimeoutbyinc.call(this, (1000 * 60 * 60)) }}> {DateArrowDown()}</button>
                    </div>
                </div>

                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.timedisplayContainer }}>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.increasetimeoutbyinc.call(this, (1000 * 60)) }}>{DateArrowUp()}</button>
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeoutminutes.call(this)} />
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.decreasetimeoutbyinc.call(this, (1000 * 60)) }} > {DateArrowDown()}</button>
                    </div>
                </div>
                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...styles.timecellContainer }}>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.toggletimeoutampm.call(this, "up") }}>{DateArrowUp()}</button>
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <input type="text" style={{ ...styles.generalField, ...styles.timeoutputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeoutampm.call(this)} />
                    </div>
                    <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.toggletimeoutampm.call(this, "down") }}> {DateArrowDown()}</button>
                    </div>
                </div>
            </div>
            {Timeout.handlecalendartimeout.call(this)}

        </div>
    </div>)
}