import { useEffect, useState } from 'react';
import axios from 'axios';

const TagSelector = ({ task, onUpdate }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // Charger les tags disponibles
    axios.get('/api/tags').then(res => setAvailableTags(res.data));
    
    // Charger les tags de la tâche
    if (task) {
      setSelectedTags(task.tags?.map(tag => tag.name) || []);
    }
  }, [task]);

  const handleTagToggle = async (tagName) => {
    const newSelectedTags = selectedTags.includes(tagName)
      ? selectedTags.filter(t => t !== tagName)
      : [...selectedTags, tagName];
    
    setSelectedTags(newSelectedTags);
    
    // Mettre à jour le backend
    if (task) {
      const { data } = await axios.post(`/api/tasks/${task.id}/tags`, {
        tags: newSelectedTags
      });
      onUpdate(data);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {availableTags.map(tag => (
        <button
          key={tag.id}
          type="button"
          onClick={() => handleTagToggle(tag.name)}
          className={`px-2 py-1 text-xs rounded-full ${
            selectedTags.includes(tag.name)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default TagSelector;