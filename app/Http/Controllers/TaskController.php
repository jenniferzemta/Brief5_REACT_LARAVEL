<?php
namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Afficher toutes les tâches de l'utilisateur connecté
    public function index()
    {

        return response()->json(Auth::user()->tasks);
        // $tasks = Auth::user()->tasks; // Récupère les tâches de l'utilisateur authentifié
        // return response()->json($tasks);
    }

    // Créer une nouvelle tâche
    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date'=>'required|string|max:10',
        ]);

        $task = Auth::user()->tasks()->create($request->all());

        return response()->json($task, 201);
        // $request->validate([
        //     'title' => 'required|string|max:255',
        //     'description' => 'required|string',
        // ]);

        // $task = Auth::user()->tasks()->create([
        //     'title' => $request->title,
        //     'description' => $request->description,
        //     'status' => 'pending', // par défaut, statut "pending"
        // ]);

        // return response()->json($task, 201);
    }


    public function show(Task $task)
    {
     //   $this->authorize('view', $task);
        return response()->json($task);
    }
    // Mettre à jour une tâche (changer le statut ou les informations)
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        // Vérifie que la tâche appartient à l'utilisateur connecté
        if ($task->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'due_date'=>'date',

            'status' => 'in:pending,in_progress,completed', // Valide le statut
        ]);

        $task->update($request->only(['title', 'description','due_date', 'status']));

        return response()->json($task);
    }

    // Supprimer une tâche
    public function destroy($id)
    {
        $task = Task::findOrFail($id);

        // Vérifie que la tâche appartient à l'utilisateur connecté
        if ($task->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }

    // Marquer une tâche comme terminée / en cours
    public function toggleStatus($id)
    {
        $task = Task::findOrFail($id);

        // Vérifie que la tâche appartient à l'utilisateur connecté
        if ($task->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Change le statut de la tâche
        $task->status = $task->status === 'completed' ? 'in_progress' : 'completed';
        $task->save();

        return response()->json($task);
    }
}

