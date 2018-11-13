<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$baseadmin = new User();
		$baseadmin->email = env('ADMIN_EMAIL', 'abarman@usc.edu');
        $baseadmin->username = env('ADMIN_EMAIL', 'abarman@usc.edu');
		$baseadmin->password = Hash::make(env('ADMIN_PASSWORD', 'abarman'));
		$baseadmin->permissions = env('ADMIN_PERMISSIONS', 0);
		$baseadmin->name = 'Avni';
        $baseadmin->firstlogin = false;
		$baseadmin->save();

        // TODO remove for final production release
        $testmentor = new User();
        $testmentor->email = 'jtnuttal@usc.edu';
        $testmentor->username = 'jtnuttal@usc.edu';
        $testmentor->password = Hash::make('jtnuttal');
        $testmentor->permissions = env('MENTOR_PERMISSIONS', 1);
        $testmentor->save();

        $testmentee = new User();
        $testmentee->email = 'dshafi@usc.edu';
        $testmentee->username = 'dshafi@usc.edu';
        $testmentee->password = Hash::make('dshafi');
        $testmentee->permissions = env('MENTEE_PERMISSIONS', 2);
        $testmentee->save();
    }
}
