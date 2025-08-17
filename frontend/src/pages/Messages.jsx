import React from 'react'

export default function Messages(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-white p-4 rounded shadow"> 
        <h3 className="font-semibold">Conversations</h3>
        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <div className="font-medium">Ravi</div>
              <div className="text-xs text-gray-500">Hey — are you available?</div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-white p-4 rounded shadow flex flex-col">
        <div className="flex-1 overflow-auto">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200" />
              <div className="bg-gray-100 p-3 rounded">Hey! I saw your post — congrats!</div>
            </div>
            <div className="flex items-end gap-3 justify-end">
              <div className="bg-blue-50 p-3 rounded">Thanks! really appreciate it.</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Write a message" />
        </div>
      </div>
    </div>
  )
}
