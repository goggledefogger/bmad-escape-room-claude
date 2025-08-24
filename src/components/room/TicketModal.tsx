/**
 * Ticket Inspection Modal
 * Displays the train ticket with seat and destination information
 */

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TicketModal({ isOpen, onClose }: TicketModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Train Ticket Inspection"
      className="max-w-md"
    >
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border-2 border-amber-200">
        {/* Ticket Header */}
        <div className="text-center mb-4 border-b-2 border-dashed border-amber-300 pb-4">
          <h3 className="text-xl font-bold text-gray-800">MIDNIGHT EXPRESS</h3>
          <p className="text-sm text-gray-600">--- BOARDING PASS ---</p>
        </div>

        {/* Ticket Information */}
        <div className="space-y-3 text-gray-800">
          <div className="flex justify-between">
            <span className="font-semibold">Passenger:</span>
            <span>J. SMITH</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Coach:</span>
            <span className="font-mono text-lg">C</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Seat:</span>
            <span className="font-mono text-lg font-bold text-blue-700">B/12</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Destination:</span>
            <span className="font-mono text-lg font-bold text-green-700">ARDEN</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Departure:</span>
            <span>22:10</span>
          </div>
        </div>

        {/* Stamp Area */}
        <div className="mt-4 p-3 border-2 border-dashed border-red-300 bg-red-50 rounded">
          <p className="text-sm text-red-600 text-center">
            <strong>CONDUCTOR'S STAMP REQUIRED</strong>
          </p>
          <p className="text-xs text-red-500 text-center mt-1">
            [Stamp appears incomplete]
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong>Note:</strong> Your seat row number and platform information may be needed
            for security verification during your journey.
          </p>

          <Button
            onClick={onClose}
            className="w-full"
            aria-label="Close ticket inspection and return to compartment"
          >
            Close Ticket
          </Button>
        </div>
      </div>
    </Modal>
  );
}
