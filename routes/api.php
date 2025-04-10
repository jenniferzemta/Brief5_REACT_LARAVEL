<?php
// imporations

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


// login
Route::post('/login', [AuthController::class,'login']);

// register
Route::post('/register', [AuthController::class,'register']);

// protegersanctum
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    // POST /logout
    Route::post('/logout', [AuthController::class, 'logout']);
   
   // get/user
    Route::get('/user', [AuthController::class, 'user']);
    

    // Route::get('tasks', [TaskController::class, 'index']);
    // Route::post('tasks', [TaskController::class, 'store']);
    // Route::put('tasks/{id}', [TaskController::class, 'update']);
    // Route::delete('tasks/{id}', [TaskController::class, 'destroy']);
    
    // Marquer une tâche comme terminée / en cours
    Route::patch('tasks/{id}/toggle', [TaskController::class, 'toggleStatus']);
     Route::apiResource('tasks', TaskController::class);
//Route::patch('/tasks/{task}/toggle', [TaskController::class, 'toggleComplete']);
    
    // // Bonus: Get all tasks (including other users)
    // Route::get('/all-tasks', [TaskController::class, 'allTasks']);

    //  // Routes pour les tâches
    //  Route::apiResource('tasks', TaskController::class);
    //  Route::patch('/tasks/{task}/toggle', [TaskController::class, 'toggle']);
   });