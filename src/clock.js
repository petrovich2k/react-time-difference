const { useState, useEffect, useRef } = React
import { AutocompleteDropdown } from "./autocomplete-dropdown";
import { Time } from "./time";
import { findCitiesByName } from "./geo-helper";
import i18next from "i18next";

export { Clock };

const Clock = (props) => {
    const [label, setLabel] = useState(`${props.city}, ${props.country}`);
    const [date, setDate] = useState(new Date());
    const [timezone, setTimezone] = useState(props.timezone);
    const [isChangedManually, setIsChangedManually] = useState(false);
    const clockComponentRef = useRef(null);

    useEffect(() => {
        if (!isChangedManually) {
            setLabel(`${props.city}, ${props.country}`);
            setTimezone(props.timezone);
        }

        setDate(props.date);
    });

    useEffect(() => {
        clockComponentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, []);

    function getItems(input) {
        return findCitiesByName(input, 10).map(item => ({
            label: `${item.city}, ${item.country}`,
            value: item.timezone
        }));
    }

    function onTimezoneChanged(item) {
        setIsChangedManually(true);
        setLabel(item.label);
        setTimezone(item.value);
        props.onChange?.();
    }

    return <div className="clock-container" ref={clockComponentRef}>
        <div className="clock">
            <div className="time">
                <Time date={date} timezone={timezone} />
            </div>
            <div className="location-name">
                <AutocompleteDropdown
                    text={label}
                    disabled={props.disabled}
                    getItems={getItems}
                    onTimezoneChanged={onTimezoneChanged} />
            </div>
            <div className="button-container">
                <button className="btn btn-outline-primary" onClick={() => props.onAdd(props.id)}>{i18next.t('Add clock')}</button>
                <button className="btn btn-light btn-remove" onClick={() => props.onRemove(props.id)}>{i18next.t('Remove')}</button>
            </div>
        </div>
    </div>;
}