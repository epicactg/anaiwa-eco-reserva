import React, { useState, useEffect } from 'react';
import { Lot } from '../types';
import { X, Save, Edit2 } from 'lucide-react';

interface LotMapProps {
  lots: Lot[];
  isEditMode?: boolean;
  onUpdateLot?: (lot: Lot) => void;
}

export const LotMap: React.FC<LotMapProps> = ({ lots, isEditMode = false, onUpdateLot }) => {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [editForm, setEditForm] = useState<Partial<Lot>>({});

  // Summary Statistics
  const stats = {
    total: lots.length,
    available: lots.filter(l => l.status === 'available').length,
    reserved: lots.filter(l => l.status === 'reserved').length,
    sold: lots.filter(l => l.status === 'sold').length,
  };

  useEffect(() => {
    if (selectedLot) {
      // Refresh selected lot data if lots array changes
      const current = lots.find(l => l.id === selectedLot.id);
      if (current) setSelectedLot(current);
    }
  }, [lots]);

  const handleEditChange = (field: keyof Lot, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    if (selectedLot && onUpdateLot) {
      onUpdateLot({ ...selectedLot, ...editForm } as Lot);
      setEditForm({});
      // Keep modal open but updated
    }
  };

  const getStatusColor = (status: Lot['status']) => {
    switch (status) {
      case 'available': return 'bg-emerald-500 hover:bg-emerald-600';
      case 'reserved': return 'bg-amber-400 hover:bg-amber-500';
      case 'sold': return 'bg-gray-400 cursor-not-allowed';
      default: return 'bg-gray-200';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
      
      {/* Project Summary Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
          <span className="block text-2xl font-bold text-gray-800">{stats.total}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Total Lotes</span>
        </div>
        <div className="bg-emerald-50 p-3 rounded-lg shadow-sm border border-emerald-100 text-center">
          <span className="block text-2xl font-bold text-emerald-600">{stats.available}</span>
          <span className="text-xs text-emerald-600 uppercase tracking-wide">Disponibles</span>
        </div>
        <div className="bg-amber-50 p-3 rounded-lg shadow-sm border border-amber-100 text-center">
          <span className="block text-2xl font-bold text-amber-600">{stats.reserved}</span>
          <span className="text-xs text-amber-600 uppercase tracking-wide">Reservados</span>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200 text-center">
          <span className="block text-2xl font-bold text-gray-500">{stats.sold}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Vendidos</span>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {lots.map((lot) => (
          <button
            key={lot.id}
            onClick={() => {
              setSelectedLot(lot);
              setEditForm({});
            }}
            disabled={!isEditMode && lot.status === 'sold'}
            className={`
              aspect-square rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md transition-all transform hover:scale-105
              ${getStatusColor(lot.status)}
              ${isEditMode ? 'ring-2 ring-offset-1 ring-blue-400 cursor-pointer' : ''}
            `}
          >
            {lot.number}
            {isEditMode && <Edit2 size={10} className="absolute bottom-1 right-1 opacity-50" />}
          </button>
        ))}
      </div>

      {/* Lot Detail Modal / Overlay */}
      {selectedLot && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm z-10 rounded-xl p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedLot(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-bold text-teal-900 mb-1">Lote {selectedLot.number}</h3>
            
            {/* EDIT MODE FORM */}
            {isEditMode ? (
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Estado</label>
                  <select 
                    className="w-full border rounded p-2 text-sm bg-gray-50"
                    value={editForm.status || selectedLot.status}
                    onChange={(e) => handleEditChange('status', e.target.value)}
                  >
                    <option value="available">Disponible</option>
                    <option value="reserved">Reservado</option>
                    <option value="sold">Vendido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Área (m²)</label>
                  <input 
                    type="number"
                    className="w-full border rounded p-2 text-sm bg-gray-50"
                    value={editForm.area !== undefined ? editForm.area : selectedLot.area}
                    onChange={(e) => handleEditChange('area', parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Precio (COP)</label>
                  <input 
                    type="number"
                    className="w-full border rounded p-2 text-sm bg-gray-50"
                    value={editForm.price !== undefined ? editForm.price : selectedLot.price}
                    onChange={(e) => handleEditChange('price', parseFloat(e.target.value))}
                  />
                </div>
                <button 
                  onClick={saveChanges}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 mt-2"
                >
                  <Save size={16} /> Guardar Cambios
                </button>
              </div>
            ) : (
              // READ ONLY MODE
              <>
                <span className={`px-2 py-0.5 rounded text-xs uppercase font-bold tracking-wider ${
                  selectedLot.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedLot.status === 'available' ? 'Disponible para Inversión' : 'Reservado'}
                </span>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Área Total:</span>
                    <span className="font-semibold text-gray-900">{selectedLot.area.toFixed(2)} m²</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Precio:</span>
                    <span className="font-bold text-teal-700 text-lg">{formatPrice(selectedLot.price)}</span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Características:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedLot.features.map((feature, idx) => (
                        <span key={idx} className="bg-teal-50 text-teal-700 px-2 py-1 rounded text-xs border border-teal-100">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    const msg = `Hola, estoy interesado en el Lote ${selectedLot.number} de Anaiwa Eco Reserva con un precio de ${formatPrice(selectedLot.price)}.`;
                    window.open(`https://wa.me/573000000000?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                >
                  ¡Me interesa este lote!
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};