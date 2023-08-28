import './SelectGroup.scss';
import React from 'react';

interface SelectGroupProps {
	id: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	label: string;
	options: { value: string; label: string }[];
	isOptionDisabled?: boolean;
	optionDisableText?: string;
}

const SelectGroup: React.FC<SelectGroupProps> = ({
	id,
	value,
	onChange,
	label,
	options,
	isOptionDisabled,
	optionDisableText,
}) => {
	return (
		<div className="selectGroupWrap">
			<select
				name=""
				id={id}
				className="selectGroup"
				value={value}
				onChange={onChange}
			>
				{/* 是否加入請選擇選項 */}
				{isOptionDisabled && (
					<option value="" disabled>
						{optionDisableText}
					</option>
				)}

				{/* 實際選項 */}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<label htmlFor={id}>{label}</label>
		</div>
	);
};

export default SelectGroup;
