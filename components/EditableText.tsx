import React, { useState } from 'react';
import { Pencil, Wand2, Check, X } from 'lucide-react';
import { generateMarketingCopy } from '../services/geminiService';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isEditMode: boolean;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  aiContext?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  value, 
  onSave, 
  isEditMode, 
  className = "", 
  tag = 'p',
  aiContext
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleAiGenerate = async () => {
    if (!aiContext) return;
    setIsLoading(true);
    const result = await generateMarketingCopy(aiContext);
    setTempValue(result);
    setIsLoading(false);
  };

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (!isEditMode) {
    const Tag = tag;
    return <Tag className={className}>{value}</Tag>;
  }

  if (isEditing) {
    return (
      <div className="relative group bg-white/10 p-2 rounded-lg border border-teal-500/30">
        <textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className={`w-full bg-transparent outline-none resize-none p-1 text-gray-800 dark:text-gray-100 ${className} min-h-[100px] border border-gray-300 rounded`}
        />
        <div className="flex gap-2 mt-2 justify-end">
          {aiContext && (
             <button 
             onClick={handleAiGenerate}
             disabled={isLoading}
             className="flex items-center gap-1 text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors"
           >
             <Wand2 size={12} className={isLoading ? "animate-spin" : ""} />
             {isLoading ? "Pensando..." : "IA Magic"}
           </button>
          )}
          <button onClick={handleSave} className="bg-green-600 text-white p-1 rounded hover:bg-green-700">
            <Check size={16} />
          </button>
          <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded hover:bg-red-600">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  const Tag = tag;
  return (
    <div className="relative group cursor-pointer border border-transparent hover:border-teal-500/50 rounded px-1 transition-all" onClick={() => setIsEditing(true)}>
      <Tag className={className}>{value}</Tag>
      <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 bg-teal-600 text-white p-1 rounded-full shadow-lg transition-opacity z-10">
        <Pencil size={12} />
      </div>
    </div>
  );
};
