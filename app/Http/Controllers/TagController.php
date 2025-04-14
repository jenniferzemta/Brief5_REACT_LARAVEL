<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TagController extends Controller
{
    /**
     * Affiche la liste des tags
     */
    public function index()
    {
        return Tag::orderBy('name')->get();
    }

    /**
     * Crée un nouveau tag
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags',
           
        ]);

        $tag = Tag::create($validated);

        return response()->json($tag, 201);
    }

    /**
     * Affiche un tag spécifique
     */
    public function show(Tag $tag)
    {
        return $tag;
    }

    /**
     * Met à jour un tag
     */
    public function update(Request $request, Tag $tag)
    {
        $validated = $request->validate([
            'name' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('tags')->ignore($tag->id)
            ],
           
        ]);

        $tag->update($validated);

        return $tag;
    }

    /**
     * Supprime un tag
     */
    public function destroy(Tag $tag)
    {
        // Détache d'abord toutes les relations avec les tâches
        $tag->tasks()->detach();
        
        $tag->delete();

        return response()->json(null, 204);
    }

    /**
     * Recherche des tags par nom
     */
    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:2'
        ]);

        return Tag::where('name', 'like', '%'.$request->query.'%')
                 ->limit(10)
                 ->get();
    }
}