<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPairingsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('pairings', function(Blueprint $table)
		{
			$table->foreign('mentorid', 'fk_pairings_users')
				->references('userid')
				->on('users')
				->onUpdate('NO ACTION')
				->onDelete('CASCADE');
			
			$table->foreign('menteeid', 'fk_pairings_users1')
				->references('userid')
				->on('users')
				->onUpdate('NO ACTION')
				->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('pairings', function(Blueprint $table)
		{
			$table->dropForeign('fk_pairings_users');
			$table->dropForeign('fk_pairings_users1');
		});
	}

}
