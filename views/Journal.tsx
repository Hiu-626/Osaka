import React, { useState } from 'react';
import { Card } from '../components/Card';
import { JournalItem } from '../types';
import { useFirestore } from '../hooks/useFirestore';

export const Journal: React.FC = () => {
  const { data: posts, add } = useFirestore<JournalItem>('journal');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newImage, setNewImage] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setNewImage(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handlePost = async () => {
      if (!newContent) return;
      
      await add({
          author: 'Me',
          avatarId: 3,
          imageUrl: newImage || `https://picsum.photos/600/400?random=${Date.now()}`,
          content: newContent,
          location: newLocation || 'Japan',
          date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      });

      setNewContent('');
      setNewLocation('');
      setNewImage('');
      setIsModalOpen(false);
  };

  return (
    <div className="pb-20 pt-4 px-4 max-w-md mx-auto h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-duck-dark ml-2">Travel Log</h1>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-duck-yellow w-10 h-10 rounded-full text-duck-dark border-2 border-duck-dark shadow-md active:translate-y-1 active:shadow-none transition-all"
        >
          <i className="fa-solid fa-camera"></i>
        </button>
      </div>

      {posts.length === 0 && (
          <div className="text-center text-gray-400 font-bold py-10">
              No memories yet. Add one!
          </div>
      )}

      {posts.map((post) => (
        <Card key={post.id} className="mb-6 p-3">
          <div className="flex items-center gap-2 mb-3 px-1">
             <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
               <img src={`https://picsum.photos/50/50?random=${post.avatarId}`} alt="avatar" />
             </div>
             <div>
               <p className="font-bold text-sm">{post.author}</p>
               <p className="text-[10px] text-gray-400">{post.location} • {post.date}</p>
             </div>
          </div>
          
          {post.imageUrl && (
              <div className="rounded-xl overflow-hidden mb-3 border-2 border-gray-100">
                <img src={post.imageUrl} className="w-full h-auto object-cover" alt="Memory" />
              </div>
          )}

          <div className="px-1">
            <p className="text-gray-700 text-sm leading-relaxed">
              {post.content} <span className="text-blue-500">#Travel</span>
            </p>
          </div>
        </Card>
      ))}

      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
                  <h3 className="text-xl font-black text-duck-dark mb-4">New Memory</h3>
                  <div className="space-y-3">
                      <textarea 
                          className="w-full border-2 border-gray-200 rounded-xl p-3 h-24 focus:border-duck-blue outline-none resize-none font-medium"
                          placeholder="What's happening?"
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                      />
                      <input 
                          className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-duck-blue outline-none"
                          placeholder="Location (e.g. Tokyo)"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                      />
                      
                      <div className="relative">
                          <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                          />
                          <label 
                              htmlFor="image-upload"
                              className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-duck-blue hover:text-duck-blue transition-colors"
                          >
                              {newImage ? (
                                  <img src={newImage} alt="Preview" className="h-20 object-contain" />
                              ) : (
                                  <>
                                    <i className="fa-solid fa-image text-2xl mb-1"></i>
                                    <span className="text-xs font-bold">Upload Photo</span>
                                  </>
                              )}
                          </label>
                      </div>

                      <div className="pt-2 flex gap-2">
                          <button 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3 text-gray-400 font-bold hover:text-gray-600"
                          >
                              Cancel
                          </button>
                          <button 
                            onClick={handlePost}
                            className="flex-1 bg-duck-dark text-white rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                          >
                              Post
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};