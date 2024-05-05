'use client'

import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";



const SiteFormField = ({form,fieldName, fieldLabel, inputType, inputPlaceholder }:SiteFormFieldProps) => {
  return (
    <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
            <div className="form-item">
            <FormLabel className="form-label">{fieldLabel}</FormLabel>
            <div className="flex w-full flex-col">
                <FormControl>
                <Input
                    {...field}
                    type={inputType}
                    placeholder={inputPlaceholder}
                    className="input-class"
                />
                </FormControl>
                <FormMessage className="form-message mt-2" />
            </div>
            </div>
        )}
    />
  )
}

export default SiteFormField