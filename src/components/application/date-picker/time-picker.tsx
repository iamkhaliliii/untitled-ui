import { useControlledState } from "@react-stately/utils";
import { Clock } from "@untitledui/icons";
import type { TimeValue } from "react-aria-components";
import { DialogTrigger as AriaDialogTrigger, Dialog as AriaDialog, Popover as AriaPopover } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { cx } from "@/utils/cx";
import { useState, useEffect } from "react";
import { parseTime } from "@internationalized/date";
import type { Key } from "react-aria";

interface TimePickerProps {
    value?: TimeValue | null;
    defaultValue?: TimeValue | null;
    onChange?: (value: TimeValue | null) => void;
    onApply?: () => void;
    onCancel?: () => void;
}

export const TimePicker = ({ value: valueProp, defaultValue, onChange, onApply, onCancel }: TimePickerProps) => {
    const [value, setValue] = useControlledState(valueProp, defaultValue || null, onChange);
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00');
    const [selectedPeriod, setSelectedPeriod] = useState<Set<Key>>(new Set(['AM']));

    useEffect(() => {
        if (value) {
            const hour24 = value.hour;
            const isPM = hour24 >= 12;
            const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
            setHour(hour12.toString().padStart(2, '0'));
            setMinute(value.minute.toString().padStart(2, '0'));
            setSelectedPeriod(new Set([isPM ? 'PM' : 'AM']));
        }
    }, [value]);

    const formattedTime = value 
        ? `${value.hour.toString().padStart(2, '0')}:${value.minute.toString().padStart(2, '0')}` 
        : "00:00";

    const handleApply = (close: () => void) => {
        const period = Array.from(selectedPeriod)[0] as string;
        let hour24 = parseInt(hour);
        
        // Convert 12-hour format to 24-hour format
        if (period === 'AM') {
            if (hour24 === 12) {
                hour24 = 0;
            }
        } else { // PM
            if (hour24 !== 12) {
                hour24 += 12;
            }
        }
        
        const timeString = `${hour24.toString().padStart(2, '0')}:${minute}`;
        const newValue = parseTime(timeString);
        setValue(newValue);
        onApply?.();
        close();
    };

    return (
        <AriaDialogTrigger>
            <Button 
                size="md" 
                color="secondary" 
                iconLeading={Clock}
            >
                {formattedTime}
            </Button>
            <AriaPopover
                offset={8}
                placement="bottom right"
                className={({ isEntering, isExiting }) =>
                    cx(
                        "will-change-transform",
                        isEntering &&
                            "duration-150 ease-out animate-in fade-in placement-right:origin-left placement-right:slide-in-from-left-0.5 placement-top:origin-bottom placement-top:slide-in-from-bottom-0.5 placement-bottom:origin-top placement-bottom:slide-in-from-top-0.5",
                        isExiting &&
                            "duration-100 ease-in animate-out fade-out placement-right:origin-left placement-right:slide-out-to-left-0.5 placement-top:origin-bottom placement-top:slide-out-to-bottom-0.5 placement-bottom:origin-top placement-bottom:slide-out-to-top-0.5",
                    )
                }
            >
                <AriaDialog className="rounded-2xl bg-primary shadow-xl ring ring-secondary_alt outline-none">
                    {({ close }) => (
                        <>
                            <div className="flex flex-col gap-3 px-6 py-5">
                                <div className="flex items-center justify-center gap-2">
                                    <input
                                        type="number"
                                        min="0"
                                        max="12"
                                        value={hour}
                                        onChange={(e) => {
                                            let val = parseInt(e.target.value);
                                            if (isNaN(val) || val < 0) val = 0;
                                            if (val > 12) val = 12;
                                            setHour(val.toString().padStart(2, '0'));
                                        }}
                                        placeholder="HH"
                                        className="w-16 h-10 text-center text-md font-semibold bg-transparent rounded-lg shadow-xs ring-1 ring-primary ring-inset focus:ring-2 focus:ring-brand outline-none transition-all text-primary"
                                    />
                                    <span className="text-md font-semibold text-tertiary">:</span>
                                    <input
                                        type="number"
                                        min="0"
                                        max="59"
                                        value={minute}
                                        onChange={(e) => {
                                            let val = parseInt(e.target.value) || 0;
                                            if (val > 59) val = 59;
                                            if (val < 0) val = 0;
                                            setMinute(val.toString().padStart(2, '0'));
                                        }}
                                        placeholder="MM"
                                        className="w-16 h-10 text-center text-md font-semibold bg-transparent rounded-lg shadow-xs ring-1 ring-primary ring-inset focus:ring-2 focus:ring-brand outline-none transition-all text-primary"
                                    />
                                    
                                    <ButtonGroup selectedKeys={selectedPeriod} onSelectionChange={setSelectedPeriod}>
                                        <ButtonGroupItem id="AM">AM</ButtonGroupItem>
                                        <ButtonGroupItem id="PM">PM</ButtonGroupItem>
                                    </ButtonGroup>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 border-t border-secondary p-4">
                                <Button
                                    size="md"
                                    color="secondary"
                                    onClick={() => {
                                        onCancel?.();
                                        close();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="md"
                                    color="primary"
                                    onClick={() => handleApply(close)}
                                >
                                    Apply
                                </Button>
                            </div>
                        </>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDialogTrigger>
    );
};

