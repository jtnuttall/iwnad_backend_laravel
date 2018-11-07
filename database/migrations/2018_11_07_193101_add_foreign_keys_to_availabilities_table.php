<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToAvailabilitiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('availabilities', function(Blueprint $table)
		{
			$table->foreign('dashboardid', 'fk_availabilities_dashboards1')->references('dashboardid')->on('dashboards')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('availabilities', function(Blueprint $table)
		{
			$table->dropForeign('fk_availabilities_dashboards1');
		});
	}

}
