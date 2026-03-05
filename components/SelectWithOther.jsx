'use client'

/**
 * Select with "Autre" option that reveals a free-text input.
 * value: current selected value
 * customValue: current custom text value (when "Autre" is selected)
 * onChange: called with new select value
 * onCustomChange: called with new custom text value
 * options: array of string options
 * placeholder: placeholder for select
 * customPlaceholder: placeholder for free text input
 * className: class for select
 * disabled: disable select
 */
export default function SelectWithOther({
  value,
  customValue = '',
  onChange,
  onCustomChange,
  options,
  placeholder = '-- Choisir --',
  customPlaceholder = 'Précisez...',
  className = '',
  disabled = false,
}) {
  return (
    <>
      <select
        value={value}
        onChange={onChange}
        className={className}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
        <option value="Autre">Autre (préciser)</option>
      </select>
      {value === 'Autre' && (
        <input
          type="text"
          value={customValue}
          onChange={onCustomChange}
          placeholder={customPlaceholder}
          className={className.replace('bg-white', 'bg-opt-input-bg') + ' mt-2'}
          style={{ background: 'var(--opt-input-bg)' }}
        />
      )}
    </>
  )
}
