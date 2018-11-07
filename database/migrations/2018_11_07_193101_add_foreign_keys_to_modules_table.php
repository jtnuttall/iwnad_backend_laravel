<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToModulesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('modules', function(Blueprint $table)
		{
			$table->foreign('dashboardid', 'fk_modules_dashboards1')->references('dashboardid')->on('dashboards')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('phaseid', 'fk_modules_phases1')->references('phaseid')->on('phases')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('modules', function(Blueprint $table)
		{
			$table->dropForeign('fk_modules_dashboards1');
			$table->dropForeign('fk_modules_phases1');
		});
	}

}
