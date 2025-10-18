"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Example country data. You can expand this list as needed.
const countries = [
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Poland", code: "+48", flag: "🇵🇱" },
  // ...add more countries
];

export function PhoneNumberForm() {
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [phoneInput, setPhoneInput] = React.useState("");
  const [parsed, setParsed] = React.useState<{
    countryCode: string;
    number: string;
  } | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const sanitized = phoneInput.replace(/\s+/g, "");
    if (!sanitized.startsWith("+")) {
      return;
    }

    const match = countries.find((country) =>
      sanitized.startsWith(country.code)
    );

    if (match && match.code !== selectedCountry) {
      setSelectedCountry(match.code);
    }
  }, [phoneInput, selectedCountry]);

  const escapeRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code);

    const normalizedInput = phoneInput.trimStart().replace(/^\+\s+/, "+");

    const sanitized = normalizedInput.replace(/\s+/g, "");
    const matchedCountry = sanitized.startsWith("+")
      ? countries.find((country) => sanitized.startsWith(country.code))
      : undefined;

    let rest = normalizedInput;

    if (matchedCountry) {
      const pattern = new RegExp(
        `^\\s*${escapeRegex(matchedCountry.code)}\\s*`
      );
      rest = normalizedInput.replace(pattern, "");
    } else if (normalizedInput.startsWith("+")) {
      rest = normalizedInput.replace(/^(\s*\+\d*)\s*/, "");
    }

    rest = rest.trimStart();

    const nextInput = rest ? `${code} ${rest}` : code;

    if (nextInput !== phoneInput) {
      setPhoneInput(nextInput);
    }
  };
  function parsePhoneNumber(input: string, countryCode: string) {
    // Remove all spaces
    const sanitized = input.replace(/\s+/g, "");
    let code = countryCode;
    let number = sanitized;
    // If input starts with +, try to extract country code from input
    if (sanitized.startsWith("+")) {
      for (const c of countries) {
        if (sanitized.startsWith(c.code)) {
          code = c.code;
          number = sanitized.slice(c.code.length);
          break;
        }
      }
    }
    // If no country code selected and none found in input, error
    if (!code) {
      return {
        error: "Please select a country code or provide it in the input.",
      };
    }
    // Remove leading zeros from number
    number = number.replace(/^0+/, "");
    // Basic validation: number should be digits only
    if (!/^\d+$/.test(number)) {
      return { error: "Phone number must contain only digits." };
    }
    return { countryCode: code, number };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = parsePhoneNumber(phoneInput, selectedCountry);
    if ("error" in result) {
      setError(result.error ?? null);
      setParsed(null);
    } else {
      setError(null);
      setParsed(result);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block mb-1 font-medium">Phone Number</label>
        <div className="flex items-center gap-2">
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Country">
                {(() => {
                  const c = countries.find((c) => c.code === selectedCountry);
                  return c ? (
                    <span className="flex items-center gap-1">
                      {c.flag} {c.code}
                    </span>
                  ) : null;
                })()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  <span className="flex items-center gap-1">
                    {c.flag} {c.code}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="123 456 789"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>
      <Button type="submit">Parse</Button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {parsed && (
        <div className="mt-2 text-green-600">
          <div>Country Code: {parsed.countryCode}</div>
          <div>Phone Number: {parsed.number}</div>
        </div>
      )}
    </form>
  );
}
