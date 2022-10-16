const { useState } = React

export { AutocompleteDropdown }

const AutocompleteDropdown = (props) => {
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState(props.text);

    function onTextChanged(e) {
        const value = e.target.value.toUpperCase();

        setSuggestions(value.length > 0
            ? props.items.filter(item => item.toUpperCase().indexOf(value) > -1).slice(0, 10).sort()
            : []);

        setText(e.target.value);
    }

    function onKeyDown(e) {
        switch (e.which) {
            case 27:
                selectSuggestion('');
                break;
            case 9:
            case 13:
                if (suggestions.length > 0) {
                    selectSuggestion(suggestions[0]);
                }
                break;
        }
    }

    function selectSuggestion(value) {
        setSuggestions([]);
        setText(value);
        props.onChange?.(value);
    }

    function renderSuggestions() {
        return suggestions.length === 0 ? null : (
            <ul>
                {suggestions.map((item, index) => <li key={index} onClick={() => selectSuggestion(item)}>{item}</li>)}
            </ul>
        );
    }

    return (
        <div className="autocomplete-textbox-component">
            <div className="textbox-container">
                <input type="text"
                    value={text}
                    placeholder={props.placeholder}
                    onChange={onTextChanged}
                    onKeyDown={onKeyDown}
                    onFocus={(e) => e.target.select()} />
            </div>
            <div className="suggestions">
                {renderSuggestions()}
            </div>
        </div>
    );
}