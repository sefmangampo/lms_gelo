require "test_helper"

class Api::V1::PaygroupsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_paygroups_index_url
    assert_response :success
  end
end
