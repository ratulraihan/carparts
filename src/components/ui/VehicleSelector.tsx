import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Button from './Button';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Dummy data
const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan'];
const models: Record<string, string[]> = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
  Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Focus'],
  Chevrolet: ['Silverado', 'Camaro', 'Equinox', 'Tahoe', 'Malibu'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'A8'],
  Nissan: ['Altima', 'Rogue', 'Sentra', 'Pathfinder', 'Murano'],
};
const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

interface VehicleSelectorProps {
  compact?: boolean;
  onSelect?: (make: string, model: string, year: string) => void;
  className?: string;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({ 
  compact = false,
  onSelect,
  className = ''
}) => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const resetSelections = () => {
    setSelectedMake('');
    setSelectedModel('');
    setSelectedYear('');
  };

  const handleSearch = () => {
    if (selectedMake && selectedModel && selectedYear && onSelect) {
      onSelect(selectedMake, selectedModel, selectedYear);
    }
  };

  const containerStyles = twMerge(
    clsx(
      'bg-white rounded-lg shadow-md',
      compact ? 'p-4' : 'p-6'
    ),
    className
  );

  const selectStyles = clsx(
    'w-full px-4 py-2 border border-gray-300 rounded-md',
    'focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent',
    'disabled:bg-gray-100 disabled:cursor-not-allowed'
  );

  return (
    <div className={containerStyles}>
      <div className={`${compact ? 'text-center mb-4' : 'mb-6'}`}>
        <h3 className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-blue-900`}>Find Parts For Your Vehicle</h3>
        {!compact && (
          <p className="text-gray-600 mt-2">Select your vehicle to find the perfect matching parts</p>
        )}
      </div>

      <div className={`${compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 gap-4 md:grid-cols-3'}`}>
        {/* Make */}
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
            Make
          </label>
          <select
            id="make"
            className={selectStyles}
            value={selectedMake}
            onChange={(e) => {
              setSelectedMake(e.target.value);
              setSelectedModel('');
            }}
          >
            <option value="">Select Make</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
            Model
          </label>
          <select
            id="model"
            className={selectStyles}
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!selectedMake}
          >
            <option value="">Select Model</option>
            {selectedMake &&
              models[selectedMake]?.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <select
            id="year"
            className={selectStyles}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            disabled={!selectedModel}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={`${compact ? 'mt-4' : 'mt-6'} flex ${compact ? 'flex-col' : 'flex-col sm:flex-row'} gap-3`}>
        <Button
          variant="primary"
          onClick={handleSearch}
          disabled={!selectedMake || !selectedModel || !selectedYear}
          fullWidth={compact}
          className={compact ? '' : 'flex-1'}
        >
          Find Parts <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          onClick={resetSelections}
          fullWidth={compact}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default VehicleSelector;