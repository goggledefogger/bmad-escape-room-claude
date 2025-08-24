/**
 * Timetable Board Modal
 * Displays the station timetable with departure information
 */

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface TimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TimetableModal({ isOpen, onClose }: TimetableModalProps) {
  const destinations = [
    { destination: 'BRISTOL', platform: 3, time: '21:45', status: 'DEPARTED' },
    { destination: 'OXFORD', platform: 7, time: '22:00', status: 'DEPARTED' },
    { destination: 'ARDEN', platform: 5, time: '22:10', status: 'ON TIME' },
    { destination: 'CHESTER', platform: 2, time: '22:25', status: 'DELAYED' },
    { destination: 'YORK', platform: 6, time: '22:40', status: 'ON TIME' },
    { destination: 'DUNDEE', platform: 4, time: '23:15', status: 'ON TIME' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Station Departure Board"
      className="max-w-2xl"
    >
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono border-2 border-green-600">
        {/* Header */}
        <div className="text-center mb-4 pb-2 border-b border-green-600">
          <h3 className="text-lg font-bold">DEPARTURES - PLATFORM INFORMATION</h3>
          <p className="text-sm text-green-300">Current Time: 22:08</p>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 mb-2 pb-2 border-b border-green-600 text-sm font-bold">
          <div>DESTINATION</div>
          <div className="text-center">PLATFORM</div>
          <div className="text-center">TIME</div>
          <div className="text-center">STATUS</div>
        </div>

        {/* Destination List */}
        <div className="space-y-1">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-4 py-2 text-sm ${
                dest.destination === 'ARDEN'
                  ? 'bg-green-800 border border-green-400 rounded px-2'
                  : ''
              }`}
            >
              <div className={dest.destination === 'ARDEN' ? 'font-bold' : ''}>
                {dest.destination}
              </div>
              <div className={`text-center font-mono text-lg ${
                dest.destination === 'ARDEN' ? 'font-bold text-yellow-400' : ''
              }`}>
                {dest.platform}
              </div>
              <div className="text-center">{dest.time}</div>
              <div className={`text-center text-xs ${
                dest.status === 'ON TIME' ? 'text-green-400' :
                dest.status === 'DELAYED' ? 'text-red-400' :
                'text-gray-500'
              }`}>
                {dest.status}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Information */}
        <div className="mt-4 pt-3 border-t border-green-600 text-xs text-green-300">
          <p>★ Your destination is highlighted above</p>
          <p>Platform numbers are required for all departures</p>
        </div>
      </div>

      <div className="mt-4">
        <Button
          onClick={onClose}
          className="w-full"
          aria-label="Close timetable and return to compartment"
        >
          Close Timetable
        </Button>
      </div>
    </Modal>
  );
}
