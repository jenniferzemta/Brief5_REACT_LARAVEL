<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'status',
        'user_id'
    ];

    protected $casts = [
        'status' => 'string', // Laravel 12 gère mieux les enum natives
    ];

    //user relation ++
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //tag
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}