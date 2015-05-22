/**
 * Implements hook_postprocess_page().
 */
/*function bootstrap_postprocess_page($scope) {
  try {
    // @TODO this should probably be called hook_postprocess_content().
    dpm('bootstrap_postprocess_page');
    $scope.content = '<div>' + $scope.content + '</div>';
  }
  catch (error) { console.log('bootstrap_postprocess_page - ' + error); }
}*/

/**
 * Implements hook_preprocess_region_container_open().
 */
function bootstrap_preprocess_region_container_open($scope, region, data) {
  try {
    // Put a div before each region.
    data.region_html += '<div class="content">';
  }
  catch (error) { console.log('bootstrap_preprocess_region_container_open - ' + error); }
}

/**
 * Implements hook_preprocess_region_container_close().
 */
function bootstrap_preprocess_region_container_close($scope, region, data) {
  try {
    // Close our div from hook_preprocess_region_container_open().
    data.region_html += '</div>';
  }
  catch (error) { console.log('bootstrap_preprocess_region_container_close - ' + error); }
}


/**
 * Implements hook_form_alter().
 */
function bootstrap_form_alter(form, form_state, form_id) {
  try {
    form.options.attributes['role'] = 'form';
  }
  catch (error) { console.log('bootstrap_form_alter - ' + error); }
}

