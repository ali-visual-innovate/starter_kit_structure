<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $users = User::where('name', 'LIKE' , '%'.$request->name.'%')->with('roles')->orderBy('id','DESC')->paginate($request->size);
        return response([
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): Response
    {
        $this->validate($request, [
            'name' => 'required|min:4',
            'email' => 'required|email',
            'password' => ['required', 'min:8', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        return response([
            'user'=> $user,
            'message' => 'User Added Successfully!'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response
    {
        return response([
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): Response
    {
        $this->validate($request, [
            'name' => 'required|min:4',
            'email' => 'required|unique:users,email,'.$user->id,
            'password' => ['required', 'min:8', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->update($request->only(['name', 'email']));

        return response([
            'user' => $user,
            'message' => 'User Updated successfully!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): Response
    {
        $user->delete();

        return response()->noContent();
    }
}
