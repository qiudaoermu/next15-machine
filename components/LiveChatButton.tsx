'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-80 bg-white rounded-lg shadow-2xl z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-900 text-white rounded-t-lg">
            <h3 className="font-semibold">Live Chat</h3>
            <p className="text-sm text-gray-300">We are online!</p>
          </div>
          <div className="p-4 h-64 bg-gray-50 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="mb-2">Chat widget placeholder</p>
              <p className="text-sm">Add Tidio/Crisp script here</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
