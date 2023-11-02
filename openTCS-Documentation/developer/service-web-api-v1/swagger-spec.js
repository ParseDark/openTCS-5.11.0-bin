window.swaggerSpec={
  "openapi" : "3.0.0",
  "info" : {
    "description" : "Bodies of HTTP requests and responses, where applicable, are JSON structures. The encoding used may be UTF-8, UTF-16 or UTF-32. Where time stamps are used, they are encoded using [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601); the time zone used is UTC.\n\nThe TCP port to be used for the HTTP requests is configuration-dependent; by default, it is 55200.\n\nBy default, requests are accepted without requiring any authentication. Optionally, an access key can be set in the kernel configuration. The configured value is then expected to be sent by the client in an HTTP header named `X-Api-Access-Key`.",
    "version" : "1.3.0",
    "title" : "openTCS web API specification"
  },
  "servers" : [ {
    "url" : "http://localhost:55200/v1",
    "description" : "openTCS kernel running on localhost"
  } ],
  "tags" : [ {
    "name" : "Transport orders",
    "description" : "Working with transport orders"
  }, {
    "name" : "Order Sequences",
    "description" : "Working with order sequences"
  }, {
    "name" : "Vehicles",
    "description" : "Working with vehicles"
  }, {
    "name" : "Peripheral jobs",
    "description" : "Working with peripheral jobs"
  }, {
    "name" : "Peripherals",
    "description" : "Working with peripherals"
  }, {
    "name" : "Plant models",
    "description" : "Working with plant models"
  }, {
    "name" : "Status",
    "description" : "Retrieving status updates"
  } ],
  "security" : [ {
    "ApiKeyAuth" : [ ]
  } ],
  "paths" : {
    "/transportOrders" : {
      "get" : {
        "tags" : [ "Transport orders" ],
        "summary" : "Retrieves a set of transport orders.",
        "description" : "",
        "parameters" : [ {
          "name" : "intendedVehicle",
          "in" : "query",
          "description" : "The name of the vehicle that is intended to process the transport orders to be retrieved.",
          "required" : false,
          "schema" : {
            "type" : "string",
            "default" : null
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "title" : "ArrayOfTransportOrders",
                  "type" : "array",
                  "items" : {
                    "$ref" : "#/components/schemas/TransportOrderState"
                  }
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find the intended vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/transportOrders/{NAME}" : {
      "get" : {
        "tags" : [ "Transport orders" ],
        "summary" : "Retrieves a single named transport order.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the transport order to be retrieved.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransportOrderState"
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find transport order 'TOrder-01'."
                  }
                }
              }
            }
          }
        }
      },
      "post" : {
        "tags" : [ "Transport orders" ],
        "summary" : "Creates a new transport order with the given name.",
        "description" : "",
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransportOrderState"
                }
              }
            }
          },
          "400" : {
            "description" : "The submitted data is invalid.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not parse JSON input."
                  }
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find location 'Storage 01'."
                  }
                }
              }
            }
          },
          "409" : {
            "description" : "An object with the same name already exists in the model.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Transport order 'TOrder-01' already exists."
                  }
                }
              }
            }
          }
        },
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the transport order to be created.",
          "required" : true,
          "schema" : {
            "type" : "string",
            "example" : "TOrder-002"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/TransportOrder"
              }
            }
          },
          "description" : "The details of the transport order to be created."
        }
      }
    },
    "/transportOrders/{NAME}/immediateAssignment" : {
      "post" : {
        "tags" : [ "Transport orders" ],
        "summary" : "Immediately assigns the transport order to its intended vehicle.",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the transport order to be assigned.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "400" : {
            "description" : "Referencing transport order with invalid state.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not assign transport order 'TOrder-01' to vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find transport order 'TOrder-01'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/transportOrders/{NAME}/withdrawal" : {
      "post" : {
        "tags" : [ "Transport orders" ],
        "summary" : "Withdraws the transport order with the given name.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the transport order to be withdrawn.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "immediate",
          "in" : "query",
          "description" : "Whether the transport order should be aborted as quickly as possible.",
          "required" : false,
          "schema" : {
            "type" : "boolean",
            "default" : false
          }
        }, {
          "name" : "disableVehicle",
          "in" : "query",
          "description" : "Deprecated, explicitly set the vehicle's integration level, instead.",
          "required" : false,
          "deprecated" : true,
          "schema" : {
            "type" : "boolean",
            "default" : false
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find transport order 'TOrder-01'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/transportOrders/{NAME}/intendedVehicle" : {
      "put" : {
        "tags" : [ "Transport orders" ],
        "summary" : "Updates the transport order's intended vehicle.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the transport order to be updated.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "vehicle",
          "in" : "query",
          "description" : "The name of the vehicle to assign the transport order to.",
          "required" : false,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find transport order 'TOrder-01'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/transportOrders/dispatcher/trigger" : {
      "post" : {
        "tags" : [ "Transport orders" ],
        "summary" : "Explicitly triggers dispatching of vehicles / transport orders.",
        "description" : "Triggers the kernel's dispatcher to assign vehicles to transport orders. This usually happens automatically, but depending on the kernel configuration, explicitly triggering it may be necessary.",
        "responses" : {
          "200" : {
            "description" : "Successful response"
          }
        }
      }
    },
    "/orderSequences" : {
      "get" : {
        "tags" : [ "Order Sequences" ],
        "summary" : "Retrieves a set of order sequences.",
        "description" : "",
        "parameters" : [ {
          "name" : "intendedVehicle",
          "in" : "query",
          "description" : "The name of the vehicle that is intended to process the order sequences to be retrieved.",
          "required" : false,
          "schema" : {
            "type" : "string",
            "default" : null
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "title" : "ArrayOfOrderSequences",
                  "type" : "array",
                  "items" : {
                    "$ref" : "#/components/schemas/OrderSequenceState"
                  }
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find the intended vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/orderSequences/{NAME}" : {
      "get" : {
        "tags" : [ "Order Sequences" ],
        "summary" : "Retrieves a single named order sequence.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the order sequence to be retrieved.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/OrderSequenceState"
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find order sequence 'Sequence-002'."
                  }
                }
              }
            }
          }
        }
      },
      "post" : {
        "tags" : [ "Order Sequences" ],
        "summary" : "Creates a new order sequence with the given name.",
        "description" : "",
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/OrderSequenceState"
                }
              }
            }
          },
          "400" : {
            "description" : "The submitted data is invalid.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not parse JSON input."
                  }
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find Vehicle 'Vehicle-002'."
                  }
                }
              }
            }
          },
          "409" : {
            "description" : "An object with the same name already exists in the model.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Order sequence 'Sequence-002' already exists."
                  }
                }
              }
            }
          }
        },
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the order sequence to be created.",
          "required" : true,
          "schema" : {
            "type" : "string",
            "example" : "OrderSequence-01"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/OrderSequence"
              }
            }
          },
          "description" : "The details of the order sequence to be created."
        }
      }
    },
    "/orderSequences/{NAME}/complete" : {
      "put" : {
        "tags" : [ "Order Sequences" ],
        "summary" : "Sets the complete flag for the named order sequence.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the order sequence.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find order sequence 'Sequence-002'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles" : {
      "get" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Retrieves a set of vehicles.",
        "description" : "",
        "parameters" : [ {
          "name" : "procState",
          "in" : "query",
          "description" : "The processing state of the vehicles to be retrieved.",
          "example" : "IDLE",
          "required" : false,
          "schema" : {
            "type" : "string",
            "default" : null,
            "enum" : [ "IDLE", "AWAITING_ORDER", "PROCESSING_ORDER" ]
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "title" : "ArrayOfVehicles",
                  "type" : "array",
                  "items" : {
                    "$ref" : "#/components/schemas/VehicleState"
                  }
                }
              }
            }
          },
          "400" : {
            "description" : "The submitted data is invalid.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not parse input."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}" : {
      "get" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Retrieves the vehicle with the given name.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the vehicle to be retrieved.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/VehicleState"
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}/withdrawal" : {
      "post" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Withdraws a transport order processed by the vehicle with the given name.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "Name of the vehicle processing the transport order to be withdrawn",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "immediate",
          "in" : "query",
          "description" : "Whether the transport order should be aborted as quickly as possible.",
          "required" : false,
          "schema" : {
            "type" : "boolean",
            "default" : false
          }
        }, {
          "name" : "disableVehicle",
          "in" : "query",
          "description" : "Deprecated, explicitly set the vehicle's integration level, instead.",
          "required" : false,
          "deprecated" : true,
          "schema" : {
            "type" : "boolean",
            "default" : false
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}/rerouteRequest" : {
      "post" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Reroutes a vehicle with the given name.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "Name of the vehicle to be rerouted",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "forced",
          "in" : "query",
          "description" : "Whether the vehicle should be rerouted even if it's not where it is expected to be.",
          "required" : false,
          "schema" : {
            "type" : "boolean",
            "default" : false
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}/integrationLevel" : {
      "put" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Sets a new integration level for the named vehicle.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the vehicle.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "newValue",
          "in" : "query",
          "description" : "The vehicle's new integration level.",
          "required" : true,
          "example" : "TO_BE_RESPECTED",
          "schema" : {
            "type" : "string",
            "enum" : [ "TO_BE_UTILIZED", "TO_BE_RESPECTED", "TO_BE_NOTICED", "TO_BE_IGNORED" ]
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}/paused" : {
      "put" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Sets the paused state for the named vehicle.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the vehicle.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "newValue",
          "in" : "query",
          "description" : "The vehicle's new paused state.",
          "required" : true,
          "example" : true,
          "schema" : {
            "type" : "boolean"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}/allowedOrderTypes" : {
      "put" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Sets the allowed order types for the named vehicle.",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the vehicle.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/AllowedOrderTypes"
              }
            }
          },
          "description" : "The list of all order types to be allowed."
        },
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "400" : {
            "description" : "The submitted data is invalid.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not parse JSON input."
                  }
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}/commAdapter/attachmentInformation" : {
      "get" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Retrieves the driver attachment information of this vehicle.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the vehicle.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/AttachmentInformation"
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}/commAdapter/attachment" : {
      "put" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Attaches the given vehicle driver to this vehicle.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the vehicle.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "newValue",
          "in" : "query",
          "description" : "The description class name of the vehicle driver that is to be attached.",
          "required" : true,
          "example" : "org.opentcs.virtualvehicle.LoopbackCommunicationAdapterDescription",
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          },
          "400" : {
            "description" : "The submitted value is invalid.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Unknown vehicle driver class name: org.opentcs.someVehicle.driver11"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}/commAdapter/enabled" : {
      "put" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Sets the enabled state for the named vehicle's driver.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the vehicle.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "newValue",
          "in" : "query",
          "description" : "The vehicle driver's new enabled state.",
          "required" : true,
          "example" : true,
          "schema" : {
            "type" : "boolean"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}/routeComputationQuery" : {
      "post" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Computes routes for the named vehicle to the given destination points.",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the vehicle.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/RoutesRequest"
              }
            }
          },
          "description" : "The destination points and optional source point for the routes to be computed."
        },
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/RoutesResponse"
                }
              }
            }
          },
          "400" : {
            "description" : "The submitted request body is invalid.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not parse JSON input."
                  }
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Unknown source point: Point-X"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/{NAME}/envelopeKey" : {
      "put" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Sets the envelope key for this vehicle.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the vehicle.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "newValue",
          "in" : "query",
          "description" : "The vehicle's new envelope key.",
          "required" : false,
          "example" : "envelopeType-01",
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/vehicles/dispatcher/trigger" : {
      "post" : {
        "tags" : [ "Vehicles" ],
        "summary" : "Explicitly triggers dispatching of vehicles / transport orders.",
        "description" : "Triggers the kernel's dispatcher to assign vehicles to transport orders. This usually happens automatically, but depending on the kernel configuration, explicitly triggering it may be necessary.",
        "responses" : {
          "200" : {
            "description" : "Successful response"
          }
        }
      }
    },
    "/peripheralJobs" : {
      "get" : {
        "tags" : [ "Peripheral jobs" ],
        "summary" : "Retrieves a set of peripheral jobs.",
        "description" : "",
        "parameters" : [ {
          "name" : "relatedVehicle",
          "in" : "query",
          "description" : "The name of the vehicle for which the peripheral jobs to be retrieved were created.",
          "required" : false,
          "schema" : {
            "type" : "string",
            "default" : null
          }
        }, {
          "name" : "relatedTransportOrder",
          "in" : "query",
          "description" : "The name of the transport order for which the peripheral jobs to be retrieved were created.",
          "required" : false,
          "schema" : {
            "type" : "string",
            "default" : null
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "title" : "ArrayOfPeripheralJobs",
                  "type" : "array",
                  "items" : {
                    "$ref" : "#/components/schemas/PeripheralJobState"
                  }
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find the related vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/peripheralJobs/{NAME}" : {
      "get" : {
        "tags" : [ "Peripheral jobs" ],
        "summary" : "Retrieves a single named peripheral job.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the peripheral job to be retrieved.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PeripheralJobState"
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find peripheral job 'PJob-01'."
                  }
                }
              }
            }
          }
        }
      },
      "post" : {
        "tags" : [ "Peripheral jobs" ],
        "summary" : "Creates a new peripheral job with the given name.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the peripheral job to be created.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PeripheralJob"
              }
            }
          },
          "description" : "The details of the peripheral job to be created."
        },
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PeripheralJobState"
                }
              }
            }
          },
          "400" : {
            "description" : "The submitted data is invalid.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not parse JSON input."
                  }
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find related vehicle 'Vehicle-0001'."
                  }
                }
              }
            }
          },
          "409" : {
            "description" : "An object with the same name already exists in the model.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Peripheral job 'PJob-01' already exists."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/peripheralJobs/{NAME}/withdrawal" : {
      "post" : {
        "tags" : [ "Peripheral jobs" ],
        "summary" : "Withdraws the peripheral job with the given name.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the peripheral job to be withdrawn.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find peripheral job 'PJob-01'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/peripheralJobs/dispatcher/trigger" : {
      "post" : {
        "tags" : [ "Peripheral jobs" ],
        "summary" : "Explicitly triggers dispatching of peripheral jobs.",
        "description" : "Triggers the kernel's dispatcher to assign peripheral jobs to peripheral devices. This usually happens automatically, but depending on the kernel configuration, explicitly triggering it may be necessary.",
        "responses" : {
          "200" : {
            "description" : "Successful response"
          }
        }
      }
    },
    "/peripherals/{NAME}/commAdapter/attachmentInformation" : {
      "get" : {
        "tags" : [ "Peripherals" ],
        "summary" : "Retrieves the driver attachment information of this peripheral.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the peripheral device/location.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PeripheralAttachmentInformation"
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find location 'Fire door 002'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/peripherals/{NAME}/commAdapter/attachment" : {
      "put" : {
        "tags" : [ "Peripherals" ],
        "summary" : "Attaches the given peripheral driver to this peripheral.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the peripheral device/location.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "newValue",
          "in" : "query",
          "description" : "The description class name of the peripheral driver that is to be attached.",
          "required" : true,
          "example" : "org.opentcs.somePeripheral.driver001",
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "400" : {
            "description" : "The submitted value is invalid.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Unknown peripheral driver class name: org.opentcs.somePeripheral.driver0011"
                  }
                }
              }
            }
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find location 'Fire door 003'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/peripherals/{NAME}/commAdapter/enabled" : {
      "put" : {
        "tags" : [ "Peripherals" ],
        "summary" : "Sets the enabled state for the named peripheral's driver.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the peripheral device/location.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "newValue",
          "in" : "query",
          "description" : "The peripheral driver's new enabled state.",
          "required" : true,
          "example" : true,
          "schema" : {
            "type" : "boolean"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find location 'Fire door 003'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/plantModel" : {
      "get" : {
        "tags" : [ "Plant models" ],
        "summary" : "Retrieves the currently loaded plant model.",
        "responses" : {
          "200" : {
            "description" : "Successful response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PlantModel"
                }
              }
            }
          }
        }
      },
      "put" : {
        "tags" : [ "Plant models" ],
        "summary" : "Uploads a new plant model with the given information.",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PlantModel"
              }
            }
          },
          "description" : "The details of the plant model to be uploaded."
        },
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "400" : {
            "description" : "The submitted plant model is invalid.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not parse JSON input."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/paths/{NAME}/locked" : {
      "put" : {
        "tags" : [ "Plant models" ],
        "summary" : "Sets the locked state for the named path.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the path.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "newValue",
          "in" : "query",
          "description" : "The path's new locked state.",
          "required" : true,
          "example" : true,
          "schema" : {
            "type" : "boolean"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find path 'Point-0001 --- Point-0002'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/locations/{NAME}/locked" : {
      "put" : {
        "tags" : [ "Plant models" ],
        "summary" : "Sets the locked state for the named location.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the location.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "newValue",
          "in" : "query",
          "description" : "The location's new locked state.",
          "required" : true,
          "example" : true,
          "schema" : {
            "type" : "boolean"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find location 'Storage 01'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/peripherals/{NAME}/withdrawal" : {
      "post" : {
        "tags" : [ "Peripherals" ],
        "summary" : "Withdraws the peripheral jobs assigned to the given peripheral.",
        "description" : "",
        "parameters" : [ {
          "name" : "NAME",
          "in" : "path",
          "description" : "The name of the peripheral device/location.",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation"
          },
          "404" : {
            "description" : "Referencing object that could not be found.",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Could not find location 'Fire door 003'."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/peripherals/dispatcher/trigger" : {
      "post" : {
        "tags" : [ "Peripherals" ],
        "summary" : "Explicitly triggers dispatching of peripheral jobs/devices.",
        "description" : "Triggers the kernel's dispatcher to assign peripheral jobs to peripheral devices. This usually happens automatically, but depending on the kernel configuration, explicitly triggering it may be necessary.",
        "responses" : {
          "200" : {
            "description" : "Successful response"
          }
        }
      }
    },
    "/events" : {
      "get" : {
        "tags" : [ "Status" ],
        "summary" : "Retrieves a list of events.",
        "description" : "This operation uses *long polling* to avoid excessive load on the server: Set the *timeout* parameter to a value that indicates how long the operation may wait if there currently aren't any events to be returned.",
        "parameters" : [ {
          "name" : "minSequenceNo",
          "in" : "query",
          "description" : "The minimum sequence number of events to be retrieved. Can/Should be used to filter out events that have already been retrieved. (Set this to the maximum sequence number already seen, incremented by 1.)",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "format" : "int64",
            "default" : 0
          }
        }, {
          "name" : "maxSequenceNo",
          "in" : "query",
          "description" : "The maximum sequence number of events to be retrieved. Can/Should be used to limit the number of events retrieved. (Set this to e.g. *minSequenceNo* + 100.)",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "format" : "int64",
            "default" : "9223372036854775807"
          }
        }, {
          "name" : "timeout",
          "in" : "query",
          "description" : "The time (in milliseconds) to wait for events to arrive if there currently are not any events to be returned. May not be greater than 10000.",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "format" : "int64",
            "default" : 1000
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/StatusMessageList"
                }
              }
            }
          },
          "400" : {
            "description" : "Invalid parameter value(s).",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "description" : "Details on the actual error.",
                    "example" : "Parameter 'timeout' is not in the correct range."
                  }
                }
              }
            }
          }
        }
      }
    },
    "/dispatcher/trigger" : {
      "post" : {
        "deprecated" : true,
        "tags" : [ "Transport orders", "Vehicles" ],
        "summary" : "Explicitly triggers dispatching of vehicles / transport orders.",
        "description" : "Triggers the kernel's dispatcher to assign vehicles to transport orders. This usually happens automatically, but depending on the kernel configuration, explicitly triggering it may be necessary.",
        "responses" : {
          "200" : {
            "description" : "Successful response"
          }
        }
      }
    }
  },
  "components" : {
    "securitySchemes" : {
      "ApiKeyAuth" : {
        "type" : "apiKey",
        "in" : "header",
        "name" : "X-Api-Access-Key"
      }
    },
    "schemas" : {
      "AttachmentInformation" : {
        "title" : "Attachment Information",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "vehicleName" : {
            "type" : "string",
            "description" : "The name of the vehicle.",
            "example" : "Vehicle-0001"
          },
          "availableCommAdapters" : {
            "type" : "array",
            "items" : {
              "type" : "string"
            },
            "description" : "The list of drivers (as names of description classes) available for this vehicle.",
            "example" : [ "org.opentcs.someVehicle.driver001", "org.opentcs.someVehicle.driver002" ]
          },
          "attachedCommAdapter" : {
            "type" : "string",
            "description" : "The description class name of the vehicle driver currently attached to this vehicle.",
            "example" : "org.opentcs.someVehicle.driver001"
          }
        }
      },
      "TransportOrderState" : {
        "title" : "Transport Order State",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "dispensable" : {
            "type" : "boolean",
            "description" : "Whether this order is dispensable (may be withdrawn automatically).",
            "example" : false
          },
          "name" : {
            "type" : "string",
            "description" : "The name of the transport order.",
            "example" : "TOrder-01"
          },
          "type" : {
            "type" : "string",
            "description" : "The type of the transport order.",
            "example" : "Park"
          },
          "state" : {
            "type" : "string",
            "enum" : [ "RAW", "ACTIVE", "DISPATCHABLE", "BEING_PROCESSED", "WITHDRAWN", "FINISHED", "FAILED", "UNROUTABLE" ],
            "description" : "The transport order's current state."
          },
          "intendedVehicle" : {
            "type" : "string",
            "description" : "The name of the vehicle that is intended to process the transport order.",
            "example" : "Vehicle-0001"
          },
          "processingVehicle" : {
            "type" : "string",
            "description" : "The name of the vehicle currently processing the transport order.",
            "example" : "Vehicle-0002"
          },
          "peripheralReservationToken" : {
            "type" : "string",
            "description" : "An (optional) token for reserving peripheral devices while processing this transport order.",
            "example" : "Token-001"
          },
          "wrappingSequence" : {
            "type" : "string",
            "description" : "The order sequence this transport order belongs to. May be `null` in case this order isn't part of any sequence.",
            "example" : "OrderSequence-01"
          },
          "destinations" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/DestinationState"
            },
            "description" : "The sequence of destinations of the transport order."
          }
        }
      },
      "DestinationState" : {
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "locationName" : {
            "type" : "string",
            "description" : "The name of the destination location",
            "example" : "Storage 01"
          },
          "operation" : {
            "type" : "string",
            "description" : "The destination operation",
            "example" : "Store"
          },
          "state" : {
            "type" : "string",
            "enum" : [ "PRISTINE", "ACTIVE", "TRAVELLING", "OPERATING", "FINISHED", "FAILED" ],
            "description" : "The drive order's state"
          },
          "properties" : {
            "type" : "array",
            "minItems" : 0,
            "maxItems" : 2147483647,
            "items" : {
              "$ref" : "#/components/schemas/Property"
            },
            "description" : "The drive order's properties"
          }
        },
        "required" : [ "locationName", "operation", "state" ]
      },
      "TransportOrder" : {
        "title" : "Transport Order",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "incompleteName" : {
            "type" : "boolean",
            "description" : "Whether the name of the transport order is considered to be incomplete. If set, the kernel will complete the name according to its configuration, e.g. by appending a suffix to it. It is recommended to set this, as names generated by the kernel can be guaranteed to be unique, while clients typically cannot guarantee this.",
            "default" : false
          },
          "dispensable" : {
            "type" : "boolean",
            "description" : "Whether this order is dispensable (may be withdrawn automatically).",
            "default" : false
          },
          "deadline" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "The (optional) deadline of the transport order",
            "example" : "2018-05-17T06:42:40.396Z"
          },
          "intendedVehicle" : {
            "type" : "string",
            "description" : "The (optional) intended vehicle of the transport order",
            "example" : "Vehicle-01"
          },
          "peripheralReservationToken" : {
            "type" : "string",
            "description" : "An (optional) token for reserving peripheral devices while processing this transport order.",
            "example" : "Token-001"
          },
          "wrappingSequence" : {
            "type" : "string",
            "description" : "The order sequence this transport order belongs to. May be `null` in case this order isn't part of any sequence.",
            "example" : "OrderSequence-01"
          },
          "type" : {
            "type" : "string",
            "description" : "The (optional) type of the transport order",
            "example" : "Park"
          },
          "destinations" : {
            "type" : "array",
            "minItems" : 1,
            "maxItems" : 2147483647,
            "items" : {
              "$ref" : "#/components/schemas/DestinationOrder"
            },
            "description" : "The destinations"
          },
          "properties" : {
            "type" : "array",
            "minItems" : 0,
            "maxItems" : 2147483647,
            "items" : {
              "$ref" : "#/components/schemas/Property"
            },
            "description" : "The transport order's properties"
          },
          "dependencies" : {
            "type" : "array",
            "minItems" : 0,
            "maxItems" : 2147483647,
            "items" : {
              "type" : "string",
              "example" : "TOrder-001"
            },
            "description" : "The transport order's dependencies"
          }
        },
        "required" : [ "destinations" ]
      },
      "DestinationOrder" : {
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "locationName" : {
            "type" : "string",
            "description" : "The name of the destination location",
            "example" : "Storage 01"
          },
          "operation" : {
            "type" : "string",
            "description" : "The destination operation",
            "example" : "Load cargo"
          },
          "properties" : {
            "type" : "array",
            "minItems" : 0,
            "maxItems" : 2147483647,
            "items" : {
              "$ref" : "#/components/schemas/Property"
            },
            "description" : "The drive order's properties"
          }
        },
        "required" : [ "locationName", "operation" ]
      },
      "AllowedOrderTypes" : {
        "title" : "Allowed Order Types",
        "type" : "object",
        "properties" : {
          "orderTypes" : {
            "type" : "array",
            "items" : {
              "type" : "string",
              "description" : "The names of the allowed order types."
            },
            "example" : [ "Park", "Load cargo", "Unload cargo" ]
          }
        },
        "required" : [ "orderTypes" ]
      },
      "OrderSequenceState" : {
        "title" : "Order Sequence State",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "The name of the order sequence.",
            "example" : "Sequence-001"
          },
          "type" : {
            "type" : "string",
            "description" : "The type of the order sequence.",
            "example" : "Park"
          },
          "orders" : {
            "type" : "array",
            "example" : [ "some-order", "another-order", "order-3" ],
            "items" : {
              "type" : "string",
              "description" : "The sequence of orders of the order sequence."
            }
          },
          "finishedIndex" : {
            "type" : "integer",
            "description" : "The index of the order that was last finished in the sequence. -1 if none was finished yet.",
            "example" : 3
          },
          "complete" : {
            "type" : "boolean",
            "description" : "Indicates whether this order sequence is complete and will not be extended by more orders.",
            "example" : false
          },
          "finished" : {
            "type" : "boolean",
            "description" : "Indicates whether this order sequence has been processed completely.",
            "example" : false
          },
          "failureFatal" : {
            "type" : "boolean",
            "description" : "Indicates whether the failure of one order in this sequence is fatal to all subsequent orders.",
            "example" : false
          },
          "intendedVehicle" : {
            "type" : "string",
            "description" : "The name of the vehicle that is intended to process the order sequence. If this sequence is free to be processed by any vehicle, this is `null`.",
            "example" : "Vehicle-0001"
          },
          "processingVehicle" : {
            "type" : "string",
            "description" : "The vehicle processing this order sequence, or `null`, if no vehicle has been assigned to it, yet.",
            "example" : "Vehicle-0002"
          },
          "properties" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/Property"
            },
            "description" : "The order sequences properties"
          }
        }
      },
      "OrderSequence" : {
        "title" : "Order Sequence",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "incompleteName" : {
            "type" : "boolean",
            "description" : "Indicates whether the name is incomplete and requires to be completed when creating the actual order sequence. (How exactly this is done is decided by the kernel.)",
            "example" : false
          },
          "type" : {
            "type" : "string",
            "description" : "The type of the order sequence.",
            "example" : "Park"
          },
          "intendedVehicle" : {
            "type" : "string",
            "description" : "The name of the vehicle that is intended to process the order sequence. If this sequence is free to be processed by any vehicle, this is `null`.",
            "example" : "Vehicle-01"
          },
          "failureFatal" : {
            "type" : "boolean",
            "description" : "Indicates whether the failure of one order in this sequence is fatal to all subsequent orders.",
            "example" : false
          },
          "properties" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/Property"
            },
            "description" : "The order sequence's properties"
          }
        }
      },
      "VehicleState" : {
        "title" : "Vehicle State",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "The name of the vehicle",
            "example" : "Vehicle-0001"
          },
          "properties" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "A set of properties (key-value pairs) associated with this object."
          },
          "length" : {
            "type" : "integer",
            "description" : "The vehicle's length (in mm).",
            "example" : 1000
          },
          "energyLevelGood" : {
            "type" : "integer",
            "description" : "The value (in %) at/above which the vehicle's energy level is considered 'good'.",
            "example" : 90
          },
          "energyLevelCritical" : {
            "type" : "integer",
            "description" : "The value (in %) at/below which the vehicle's energy level is considered 'critical'.",
            "example" : 30
          },
          "energyLevel" : {
            "type" : "integer",
            "description" : "The vehicle's remaining energy (in %).",
            "example" : 60
          },
          "integrationLevel" : {
            "type" : "string",
            "enum" : [ "TO_BE_IGNORED", "TO_BE_NOTICED", "TO_BE_RESPECTED", "TO_BE_UTILIZED" ],
            "description" : "The vehicle's integration level."
          },
          "paused" : {
            "type" : "boolean",
            "description" : "Whether the vehicle is paused.",
            "example" : false
          },
          "procState" : {
            "type" : "string",
            "enum" : [ "UNAVAILABLE", "IDLE", "AWAITING_ORDER", "PROCESSING_ORDER" ],
            "description" : "The vehicle's current processing state."
          },
          "transportOrder" : {
            "type" : "string",
            "description" : "The name of the transport order the vehicle is currently processing.",
            "example" : "TOrder-01"
          },
          "currentPosition" : {
            "type" : "string",
            "description" : "The name of the point which the vehicle currently occupies.",
            "example" : "Point-0001"
          },
          "precisePosition" : {
            "$ref" : "#/components/schemas/PrecisePosition"
          },
          "state" : {
            "type" : "string",
            "enum" : [ "UNKNOWN", "UNAVAILABLE", "ERROR", "IDLE", "EXECUTING", "CHARGING" ],
            "description" : "The vehicle's current state."
          },
          "allocatedResources" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/ResourceSet"
            },
            "description" : "The resources already allocated by the vehicle.",
            "example" : [ [ "Path-0039--0040", "Point-0040" ], [ "Path-0040--0041", "Point-0041" ] ]
          },
          "claimedResources" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/ResourceSet"
            },
            "description" : "The resources claimed - i.e. not yet allocated - for the vehicle's route.",
            "example" : [ [ "Path-0041--0042", "Point-0042" ], [ "Path-0042--0043", "Point-0043", "Location-2345" ] ]
          },
          "allowedOrderTypes" : {
            "type" : "array",
            "items" : {
              "type" : "string",
              "description" : "The allowed order types for this vehicle."
            },
            "example" : [ "OrderType001", "OrderType002" ]
          },
          "envelopeKey" : {
            "type" : "string",
            "description" : "The envelope key for this vehicle.",
            "example" : "envelopeType-01"
          }
        },
        "required" : [ "length", "energyLevelGood", "energyLevelCritical", "energyLevel", "allocatedResources", "claimedResources" ]
      },
      "ResourceSet" : {
        "type" : "array",
        "items" : {
          "type" : "string",
          "description" : "Name of the resource"
        },
        "example" : [ "Point-0042", "Path-0041--0042" ]
      },
      "StatusMessageList" : {
        "title" : "Status Message List",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "timeStamp" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "The point of time at which this data structure was created"
          },
          "statusMessages" : {
            "type" : "array",
            "items" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/OrderStatusMessage"
              }, {
                "$ref" : "#/components/schemas/VehicleStatusMessage"
              }, {
                "$ref" : "#/components/schemas/PeripheralJobStatusMessage"
              } ]
            },
            "description" : "The status messages"
          }
        },
        "required" : [ "timeStamp", "statusMessages" ]
      },
      "StatusMessage" : {
        "title" : "AbstractStatusMessage",
        "type" : "object",
        "properties" : {
          "type" : {
            "type" : "string",
            "enum" : [ "TransportOrder", "Vehicle", "PeripheralJob" ]
          },
          "sequenceNumber" : {
            "type" : "integer",
            "description" : "The (unique) sequence number of this status message",
            "example" : 123
          },
          "creationTimeStamp" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "When this status message was created",
            "example" : "2018-05-14T07:42:00.343Z"
          }
        },
        "discriminator" : {
          "propertyName" : "type"
        },
        "required" : [ "type", "sequenceNumber", "creationTimeStamp" ]
      },
      "OrderStatusMessage" : {
        "title" : "OrderStatusMessage",
        "type" : "object",
        "additionalProperties" : false,
        "allOf" : [ {
          "$ref" : "#/components/schemas/StatusMessage"
        }, {
          "properties" : {
            "type" : {
              "type" : "string",
              "enum" : [ "TransportOrder" ],
              "default" : "TransportOrder"
            },
            "sequenceNumber" : {
              "example" : 124
            },
            "orderName" : {
              "type" : "string",
              "description" : "The (optional) transport order name",
              "example" : "TOrder-0001"
            },
            "processingVehicleName" : {
              "type" : "string",
              "description" : "The processing vehicle's name",
              "example" : "Vehicle-0001"
            },
            "orderState" : {
              "type" : "string",
              "enum" : [ "RAW", "ACTIVE", "DISPATCHABLE", "BEING_PROCESSED", "WITHDRAWN", "FINISHED", "FAILED", "UNROUTABLE" ],
              "description" : "The transport order's current state"
            },
            "destinations" : {
              "type" : "array",
              "minItems" : 1,
              "maxItems" : 2147483647,
              "items" : {
                "$ref" : "#/components/schemas/DestinationState"
              },
              "description" : "The transport order's destinations"
            },
            "properties" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/components/schemas/Property"
              },
              "description" : "The transport order's properties"
            }
          }
        } ],
        "required" : [ "type" ]
      },
      "VehicleStatusMessage" : {
        "type" : "object",
        "additionalProperties" : false,
        "allOf" : [ {
          "$ref" : "#/components/schemas/StatusMessage"
        }, {
          "properties" : {
            "type" : {
              "type" : "string",
              "enum" : [ "Vehicle" ],
              "default" : "Vehicle"
            },
            "sequenceNumber" : {
              "example" : 125
            },
            "vehicleName" : {
              "type" : "string",
              "description" : "The vehicle's name",
              "example" : "Vehicle-0001"
            },
            "transportOrderName" : {
              "type" : "string",
              "description" : "The name of the transport order the vehicle currently processes",
              "example" : "TOrder-0001"
            },
            "position" : {
              "type" : "string",
              "description" : "The name of the point the vehicle currently occupies",
              "example" : "Point-0001"
            },
            "precisePosition" : {
              "$ref" : "#/components/schemas/PrecisePosition"
            },
            "paused" : {
              "type" : "boolean",
              "description" : "Whether the vehicle is paused.",
              "example" : false
            },
            "state" : {
              "type" : "string",
              "enum" : [ "UNKNOWN", "UNAVAILABLE", "ERROR", "IDLE", "EXECUTING", "CHARGING" ],
              "description" : "The vehicle's current state"
            },
            "procState" : {
              "type" : "string",
              "enum" : [ "UNAVAILABLE", "IDLE", "AWAITING_ORDER", "PROCESSING_ORDER" ],
              "description" : "The vehicle's current processing state"
            },
            "allocatedResources" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/components/schemas/ResourceSet"
              },
              "description" : "The resources already allocated by the vehicle.",
              "example" : [ [ "Path-0039--0040", "Point-0040" ], [ "Path-0040--0041", "Point-0041" ] ]
            },
            "claimedResources" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/components/schemas/ResourceSet"
              },
              "description" : "The resources claimed - i.e. not yet allocated - for the vehicle's route.",
              "example" : [ [ "Path-0041--0042", "Point-0042" ], [ "Path-0042--0043", "Point-0043", "Location-2345" ] ]
            }
          }
        } ],
        "title" : "VehicleStatusMessage",
        "required" : [ "type", "vehicleName", "state", "procState", "allocatedResources", "claimedResources" ]
      },
      "PeripheralJobStatusMessage" : {
        "title" : "PeripheralJobStatusMessage",
        "type" : "object",
        "additionalProperties" : false,
        "allOf" : [ {
          "$ref" : "#/components/schemas/StatusMessage"
        }, {
          "$ref" : "#/components/schemas/PeripheralJobState"
        }, {
          "properties" : {
            "type" : {
              "type" : "string",
              "enum" : [ "PeripheralJob" ],
              "default" : "PeripheralJob"
            },
            "sequenceNumber" : {
              "example" : 126
            }
          }
        } ]
      },
      "Property" : {
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "key" : {
            "type" : "string",
            "description" : "The property's key",
            "example" : "key1"
          },
          "value" : {
            "type" : "string",
            "description" : "The property's value",
            "example" : "value1"
          }
        },
        "required" : [ "key", "value" ]
      },
      "PrecisePosition" : {
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "x" : {
            "type" : "integer",
            "description" : "The position's X coordinate",
            "example" : 60
          },
          "y" : {
            "type" : "integer",
            "description" : "The position's Y coordinate",
            "example" : 40
          },
          "z" : {
            "type" : "integer",
            "description" : "The position's Z coordinate",
            "example" : 0
          }
        },
        "required" : [ "x", "y", "z" ]
      },
      "PeripheralJobState" : {
        "title" : "Peripheral Job State",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "The name of the peripheral job.",
            "example" : "PJob-01"
          },
          "reservationToken" : {
            "type" : "string",
            "description" : "A token that may be used to reserve a peripheral device. A peripheral device that is reserved for a specific token can only process jobs which match that reservation token.",
            "example" : "Vehicle-0001"
          },
          "relatedVehicle" : {
            "type" : "string",
            "description" : "The name of the vehicle for which the peripheral job was created. May be `null`, if the job wasn't created in the context of a transport order being processed by a vehicle.",
            "example" : "Vehicle-0001"
          },
          "relatedTransportOrder" : {
            "type" : "string",
            "description" : "The name of the transport order for which the peripheral job was created. May be `null`, if the job wasn't created in the context of a transport order being processed by a vehicle.",
            "example" : "TOrder-01"
          },
          "peripheralOperation" : {
            "$ref" : "#/components/schemas/PeripheralOperation"
          },
          "state" : {
            "type" : "string",
            "description" : "The peripheral job's current state.",
            "enum" : [ "TO_BE_PROCESSED", "BEING_PROCESSED", "FINISHED", "FAILED" ]
          },
          "creationTime" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "The point of time at which this peripheral job was created (expressed according to ISO 8601).",
            "example" : "2022-01-01T12:00:00Z"
          },
          "finishedTime" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "The point of time at which processing of this peripheral job was finished (expressed according to ISO 8601).",
            "example" : "2022-01-01T12:00:00Z"
          },
          "properties" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/Property"
            },
            "description" : "The peripheral job's properties."
          }
        },
        "required" : [ "name", "reservationToken", "relatedVehicle", "relatedTransportOrder", "peripheralOperation", "state", "creationTime", "finishedTime" ]
      },
      "PeripheralJob" : {
        "title" : "Peripheral Job",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "incompleteName" : {
            "type" : "boolean",
            "description" : "Whether the name of the peripheral job is considered to be incomplete. If set, the kernel will complete the name according to its configuration, e.g. by appending a suffix to it. It is recommended to set this, as names generated by the kernel can be guaranteed to be unique, while clients typically cannot guarantee this.",
            "default" : false
          },
          "reservationToken" : {
            "type" : "string",
            "description" : "The token that may be used to reserve a peripheral device. A peripheral device that is reserved for a specific token can only process jobs which match that reservation token. The reservation token may not be empty."
          },
          "relatedVehicle" : {
            "type" : "string",
            "description" : "The name of the vehicle for which the peripheral job was created. May be `null`, if the job wasn't created in the context of a transport order being processed by a vehicle.",
            "default" : null
          },
          "relatedTransportOrder" : {
            "type" : "string",
            "description" : "The name of the transport order for which the peripheral job was created. May be `null`, if the job wasn't created in the context of a transport order being processed by a vehicle.",
            "default" : null
          },
          "peripheralOperation" : {
            "$ref" : "#/components/schemas/PeripheralOperation"
          },
          "properties" : {
            "type" : "array",
            "minItems" : 0,
            "maxItems" : 2147483647,
            "items" : {
              "$ref" : "#/components/schemas/Property"
            },
            "description" : "The peripheral jobs's properties."
          }
        },
        "required" : [ "reservationToken", "peripheralOperation" ]
      },
      "PeripheralOperation" : {
        "title" : "Peripheral Operation",
        "description" : "An operation that is to be executed by a peripheral device.",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "operation" : {
            "type" : "string",
            "description" : "The operation to be performed by the peripheral device.",
            "example" : "Open door"
          },
          "locationName" : {
            "type" : "string",
            "description" : "The name of the location the peripheral device is associated with.",
            "example" : "Loading Bay"
          },
          "executionTrigger" : {
            "type" : "string",
            "description" : "The moment at which this operation is to be performed.",
            "enum" : [ "AFTER_ALLOCATION", "AFTER_MOVEMENT" ],
            "default" : "AFTER_ALLOCATION"
          },
          "completionRequired" : {
            "type" : "boolean",
            "description" : "Whether the completion of this operation is required to allow a vehicle to continue driving.",
            "default" : false
          }
        },
        "required" : [ "operation", "locationName" ]
      },
      "PeripheralAttachmentInformation" : {
        "title" : "Attachment Information",
        "type" : "object",
        "additionalProperties" : false,
        "properties" : {
          "locationReference" : {
            "type" : "string",
            "description" : "The name of the location.",
            "example" : "Fire door 001"
          },
          "attachedCommAdapter" : {
            "type" : "string",
            "description" : "The description class name of the peripheral driver currently attached to this location.",
            "example" : "org.opentcs.somePeripheral.driver001"
          }
        }
      },
      "PlantModel" : {
        "title" : "Plant model",
        "type" : "object",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "The plant model's name.",
            "example" : "Plant Model 01"
          },
          "points" : {
            "type" : "array",
            "description" : "The plant model's points.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelPoint"
            },
            "example" : [ {
              "name" : "Point-A",
              "position" : {
                "x" : 15000,
                "y" : 20000,
                "z" : 0
              },
              "vehicleOrientationAngle" : 90,
              "type" : "HALT_POSITION",
              "layout" : {
                "position" : {
                  "x" : 15000,
                  "y" : 20000
                },
                "labelOffset" : {
                  "x" : 10,
                  "y" : 10
                },
                "layerId" : 0
              },
              "properties" : [ {
                "name" : "isExampleProperty",
                "value" : true
              } ]
            }, {
              "name" : "Point-B",
              "position" : {
                "x" : 30000,
                "y" : 20000,
                "z" : 0
              },
              "vehicleOrientationAngle" : 90,
              "type" : "HALT_POSITION",
              "layout" : {
                "position" : {
                  "x" : 30000,
                  "y" : 20000
                },
                "labelOffset" : {
                  "x" : 10,
                  "y" : 10
                },
                "layerId" : 0
              },
              "properties" : [ {
                "name" : "isExampleProperty",
                "value" : true
              } ]
            }, {
              "name" : "Point-C",
              "position" : {
                "x" : 10000,
                "y" : 30000,
                "z" : 0
              },
              "vehicleOrientationAngle" : "NaN",
              "type" : "HALT_POSITION",
              "layout" : {
                "position" : {
                  "x" : 10000,
                  "y" : 30000
                },
                "labelOffset" : {
                  "x" : 10,
                  "y" : 10
                },
                "layerId" : 0
              }
            }, {
              "name" : "Point-D",
              "position" : {
                "x" : 25000,
                "y" : 30000,
                "z" : 0
              },
              "vehicleOrientationAngle" : "NaN",
              "type" : "HALT_POSITION",
              "layout" : {
                "position" : {
                  "x" : 25000,
                  "y" : 30000
                },
                "labelOffset" : {
                  "x" : 10,
                  "y" : 10
                },
                "layerId" : 0
              }
            } ]
          },
          "paths" : {
            "type" : "array",
            "description" : "The plant model's paths.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelPath"
            },
            "example" : [ {
              "name" : "Path-AB",
              "srcPointName" : "Point-A",
              "destPointName" : "Point-B",
              "maxVelocity" : 2500,
              "maxReverseVelocity" : 2500,
              "locked" : false,
              "layout" : {
                "connectionType" : "DIRECT",
                "layerId" : 0
              },
              "properties" : [ {
                "name" : "pathPropertyKey",
                "value" : "exampleValue"
              } ]
            }, {
              "name" : "Path-BC",
              "srcPointName" : "Point-B",
              "destPointName" : "Point-C",
              "maxVelocity" : 2500,
              "maxReverseVelocity" : 2500,
              "layout" : {
                "connectionType" : "DIRECT",
                "layerId" : 0
              }
            }, {
              "name" : "Path-CA",
              "srcPointName" : "Point-C",
              "destPointName" : "Point-A",
              "maxVelocity" : 2500,
              "maxReverseVelocity" : 2500,
              "layout" : {
                "connectionType" : "DIRECT",
                "layerId" : 0
              }
            }, {
              "name" : "Path-CD",
              "srcPointName" : "Point-C",
              "destPointName" : "Point-D",
              "maxVelocity" : 1500,
              "maxReverseVelocity" : 1000,
              "layout" : {
                "connectionType" : "DIRECT",
                "layerId" : 0
              }
            }, {
              "name" : "Path-DA",
              "srcPointName" : "Point-D",
              "destPointName" : "Point-A",
              "maxVelocity" : 2500,
              "maxReverseVelocity" : 2500,
              "layout" : {
                "connectionType" : "DIRECT",
                "layerId" : 0
              }
            }, {
              "name" : "Path-DB",
              "srcPointName" : "Point-D",
              "destPointName" : "Point-B",
              "maxVelocity" : 2500,
              "maxReverseVelocity" : 2500,
              "layout" : {
                "connectionType" : "DIRECT",
                "layerId" : 0
              }
            } ]
          },
          "locationTypes" : {
            "type" : "array",
            "description" : "The plant model's location types.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelLocationType"
            },
            "example" : [ {
              "name" : "Transfer-station",
              "allowedOperations" : [ "Load cargo", "Unload cargo" ],
              "layout" : {
                "locationRepresentation" : "LOAD_TRANSFER_GENERIC"
              },
              "properties" : [ {
                "name" : "locationTypePropertyKey",
                "value" : "locationTypePropertyValue"
              } ]
            }, {
              "name" : "Working-station",
              "allowedOperations" : [ "Cut", "Drill" ],
              "layout" : {
                "locationRepresentation" : "WORKING_GENERIC"
              }
            } ]
          },
          "locations" : {
            "type" : "array",
            "description" : "The plant model's locations.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelLocation"
            },
            "example" : [ {
              "name" : "Storage 01",
              "typeName" : "Transfer-station",
              "position" : {
                "x" : 15000,
                "y" : 10000,
                "z" : 0
              },
              "links" : [ {
                "pointName" : "Point-A"
              } ],
              "locked" : false,
              "layout" : {
                "position" : {
                  "x" : 15000,
                  "y" : 10000
                },
                "labelOffset" : {
                  "x" : 10,
                  "y" : 10
                },
                "locationRepresentation" : "LOAD_TRANSFER_ALT_1",
                "layerId" : 0
              }
            }, {
              "name" : "Storage 02",
              "typeName" : "Transfer-station",
              "position" : {
                "x" : 30000,
                "y" : 10000,
                "z" : 0
              },
              "links" : [ {
                "pointName" : "Point-B"
              } ],
              "locked" : false,
              "layout" : {
                "position" : {
                  "x" : 30000,
                  "y" : 10000
                },
                "labelOffset" : {
                  "x" : 10,
                  "y" : 10
                },
                "layerId" : 0
              }
            }, {
              "name" : "Workshop",
              "typeName" : "Working-station",
              "position" : {
                "x" : 35000,
                "y" : 30000,
                "z" : 0
              },
              "links" : [ {
                "pointName" : "Point-D"
              } ],
              "locked" : false,
              "layout" : {
                "position" : {
                  "x" : 35000,
                  "y" : 30000
                },
                "labelOffset" : {
                  "x" : 10,
                  "y" : 10
                },
                "layerId" : 0
              }
            }, {
              "name" : "Loading Bay",
              "typeName" : "Transfer-station",
              "position" : {
                "x" : 0,
                "y" : 30000,
                "z" : 0
              },
              "links" : [ {
                "pointName" : "Point-C"
              } ],
              "locked" : false,
              "layout" : {
                "position" : {
                  "x" : 0,
                  "y" : 30000
                },
                "labelOffset" : {
                  "x" : 10,
                  "y" : 10
                },
                "layerId" : 0
              }
            } ]
          },
          "blocks" : {
            "type" : "array",
            "description" : "The plant model's blocks.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelBlock"
            },
            "example" : [ {
              "name" : "Block-01",
              "type" : "SINGLE_VEHICLE_ONLY",
              "memberNames" : [ "Path-BC", "Path-DA" ],
              "layout" : {
                "color" : "#FF0000"
              }
            } ]
          },
          "vehicles" : {
            "type" : "array",
            "description" : "The plant model's vehicles.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelVehicle"
            },
            "example" : [ {
              "name" : "Vehicle-01",
              "length" : 1000,
              "energyLevelCritical" : 15,
              "energyLevelGood" : 50,
              "energyLevelFullyRecharged" : 97,
              "energyLevelSufficientlyRecharged" : 75,
              "maxVelocity" : 1500,
              "maxReverseVelocity" : 750,
              "layout" : {
                "routeColor" : "#00FF00"
              }
            }, {
              "name" : "Vehicle-02",
              "length" : 1000,
              "energyLevelCritical" : 15,
              "energyLevelGood" : 50,
              "energyLevelFullyRecharged" : 97,
              "energyLevelSufficientlyRecharged" : 75,
              "maxVelocity" : 1500,
              "maxReverseVelocity" : 750,
              "layout" : {
                "routeColor" : "#550055"
              }
            } ]
          },
          "visualLayout" : {
            "$ref" : "#/components/schemas/PlantModelVisualLayout"
          },
          "properties" : {
            "type" : "array",
            "description" : "The plant model's properties.",
            "items" : {
              "example" : {
                "name" : "modelPropertyExample",
                "value" : "value"
              }
            }
          }
        },
        "required" : [ "name" ]
      },
      "PlantModelPoint" : {
        "title" : "Point",
        "type" : "object",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "This point's name.",
            "example" : "some point"
          },
          "position" : {
            "$ref" : "#/components/schemas/PlantModelTriple"
          },
          "vehicleOrientationAngle" : {
            "oneOf" : [ {
              "type" : "string"
            }, {
              "type" : "number",
              "format" : "double"
            } ],
            "description" : "The vehicle's (assumed) orientation angle (-360..360) when it is at this position. May be a string (\"NaN\") if an orientation angle is not defined for this point.",
            "example" : 73.3
          },
          "type" : {
            "type" : "string",
            "description" : "This point's type.",
            "enum" : [ "REPORT_POSITION", "HALT_POSITION", "PARK_POSITION" ]
          },
          "vehicleEnvelopes" : {
            "type" : "array",
            "description" : "A map of envelope keys to envelopes that vehicles located at this point may occupy.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelEnvelope"
            }
          },
          "layout" : {
            "type" : "object",
            "description" : "Describes the graphical representation of this point.",
            "properties" : {
              "position" : {
                "$ref" : "#/components/schemas/PlantModelCouple"
              },
              "labelOffset" : {
                "$ref" : "#/components/schemas/PlantModelCouple"
              },
              "layerId" : {
                "type" : "integer",
                "example" : 3
              }
            }
          },
          "properties" : {
            "type" : "array",
            "description" : "This point's properties.",
            "items" : {
              "$ref" : "#/components/schemas/Property"
            }
          }
        },
        "required" : [ "name" ]
      },
      "PlantModelPath" : {
        "title" : "Path",
        "type" : "object",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "This path's name.",
            "example" : "some path"
          },
          "srcPointName" : {
            "type" : "string",
            "description" : "The point name this path originates in.",
            "example" : "some point"
          },
          "destPointName" : {
            "type" : "string",
            "description" : "The point name this path ends in.",
            "example" : "another point"
          },
          "length" : {
            "type" : "integer",
            "format" : "int64",
            "description" : "This path's length (in mm).",
            "example" : 1300
          },
          "maxVelocity" : {
            "type" : "integer",
            "description" : "The absolute maximum allowed forward velocity on this path (in mm/s). A value of 0 (default) means forward movement is not allowed on this path.",
            "example" : 1000
          },
          "maxReverseVelocity" : {
            "type" : "integer",
            "description" : "The absolute maximum allowed reverse velocity on this path (in mm/s). A value of 0 (default) means reverse movement is not allowed on this path.",
            "example" : 300
          },
          "peripheralOperations" : {
            "type" : "array",
            "description" : "The peripheral operations to be performed when a vehicle travels along this path.",
            "items" : {
              "type" : "object",
              "properties" : {
                "operation" : {
                  "type" : "string",
                  "example" : "some operation"
                },
                "locationName" : {
                  "type" : "string",
                  "example" : "some location"
                },
                "executionTrigger" : {
                  "type" : "string",
                  "enum" : [ "AFTER_ALLOCATION", "AFTER_MOVEMENT" ]
                },
                "completionRequired" : {
                  "type" : "boolean"
                }
              }
            }
          },
          "locked" : {
            "type" : "boolean",
            "description" : "A flag for marking this path as locked (i.e. to prevent vehicles from using it)."
          },
          "vehicleEnvelopes" : {
            "type" : "array",
            "description" : "A map of envelope keys to envelopes that vehicles traversing this path may occupy.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelEnvelope"
            }
          },
          "layout" : {
            "type" : "object",
            "description" : "The information regarding the grahical representation of this path.",
            "properties" : {
              "connectionType" : {
                "type" : "string",
                "enum" : [ "DIRECT", "ELBOW", "SLANTED", "POLYPATH", "BEZIER", "BEZIER_3" ]
              },
              "controlPoints" : {
                "type" : "array",
                "items" : {
                  "$ref" : "#/components/schemas/PlantModelCouple"
                }
              },
              "layerId" : {
                "type" : "integer",
                "example" : 3
              }
            }
          },
          "properties" : {
            "items" : {
              "$ref" : "#/components/schemas/Property"
            }
          }
        },
        "required" : [ "name", "srcPointName", "destPointName" ]
      },
      "PlantModelLocationType" : {
        "title" : "Location Type",
        "type" : "object",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "This location type's name.",
            "example" : "some location type"
          },
          "allowedOperations" : {
            "type" : "array",
            "description" : "The allowed operations for this location type.",
            "items" : {
              "type" : "string",
              "example" : [ "some operation", "another operation" ]
            }
          },
          "allowedPeripheralOperations" : {
            "type" : "array",
            "description" : "The allowed peripheral operations for this location type.",
            "items" : {
              "type" : "string",
              "example" : [ "some peripheral operation", "another peripheral operation" ]
            }
          },
          "layout" : {
            "type" : "object",
            "description" : "The information regarding the grahical representation of this location type.",
            "properties" : {
              "locationRepresentation" : {
                "type" : "string",
                "enum" : [ "NONE", "DEFAULT", "LOAD_TRANSFER_GENERIC", "LOAD_TRANSFER_ALT_1", "LOAD_TRANSFER_ALT_2", "LOAD_TRANSFER_ALT_3", "LOAD_TRANSFER_ALT_4", "LOAD_TRANSFER_ALT_5", "WORKING_GENERIC", "WORKING_ALT_1", "WORKING_ALT_2", "RECHARGE_GENERIC", "RECHARGE_ALT_1", "RECHARGE_ALT_2" ]
              }
            }
          },
          "properties" : {
            "type" : "object",
            "description" : "This location type's properties.",
            "items" : {
              "$ref" : "#/components/schemas/Property"
            }
          }
        },
        "required" : [ "name" ]
      },
      "PlantModelLocation" : {
        "title" : "Location",
        "type" : "object",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "This location's name.",
            "example" : "some location"
          },
          "typeName" : {
            "type" : "string",
            "description" : "The name of this location's type.",
            "example" : "some location type"
          },
          "position" : {
            "$ref" : "#/components/schemas/PlantModelTriple"
          },
          "links" : {
            "type" : "array",
            "description" : "The links attaching points to this location. This is a map of point names to allowed operations.",
            "items" : {
              "type" : "object",
              "properties" : {
                "pointName" : {
                  "type" : "string",
                  "example" : "some point"
                },
                "allowedOperations" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string",
                    "example" : "some operation"
                  }
                }
              }
            }
          },
          "locked" : {
            "type" : "boolean",
            "description" : "A flag for marking this location as locked (i.e. to prevent vehicles from using it)."
          },
          "layout" : {
            "type" : "object",
            "description" : "The information regarding the grahical representation of this location.",
            "properties" : {
              "position" : {
                "$ref" : "#/components/schemas/PlantModelCouple"
              },
              "labelOffset" : {
                "$ref" : "#/components/schemas/PlantModelCouple"
              },
              "locationRepresentation" : {
                "type" : "string",
                "enum" : [ "NONE", "DEFAULT", "LOAD_TRANSFER_GENERIC", "LOAD_TRANSFER_ALT_1", "LOAD_TRANSFER_ALT_2", "LOAD_TRANSFER_ALT_3", "LOAD_TRANSFER_ALT_4", "LOAD_TRANSFER_ALT_5", "WORKING_GENERIC", "WORKING_ALT_1", "WORKING_ALT_2", "RECHARGE_GENERIC", "RECHARGE_ALT_1", "RECHARGE_ALT_2" ]
              },
              "layerId" : {
                "type" : "integer",
                "example" : 3
              }
            }
          },
          "properties" : {
            "type" : "array",
            "description" : "This location's properties.",
            "items" : {
              "$ref" : "#/components/schemas/Property"
            }
          }
        },
        "required" : [ "name", "typeName", "position" ]
      },
      "PlantModelBlock" : {
        "title" : "Block",
        "type" : "object",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "This block's name.",
            "example" : "some block"
          },
          "type" : {
            "type" : "string",
            "description" : "This block's type.",
            "enum" : [ "SINGLE_VEHICLE_ONLY", "SAME_DIRECTION_ONLY" ]
          },
          "memberNames" : {
            "type" : "array",
            "items" : {
              "type" : "string"
            },
            "description" : "This block's member names.",
            "example" : [ "Path-AB", "Path-BC" ]
          },
          "layout" : {
            "type" : "object",
            "description" : "The information regarding the grahical representation of this block.",
            "properties" : {
              "color" : {
                "type" : "string",
                "pattern" : "^#([A-Fa-f0-9]{6})$",
                "example" : "#FF0000"
              }
            }
          },
          "properties" : {
            "type" : "array",
            "description" : "This block's properties.",
            "items" : {
              "$ref" : "#/components/schemas/Property"
            }
          }
        },
        "required" : [ "name" ]
      },
      "PlantModelVehicle" : {
        "title" : "Vehicle",
        "type" : "object",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "This vehicle's name.",
            "example" : "some vehicle"
          },
          "length" : {
            "type" : "integer",
            "description" : "The vehicle's length (in mm).",
            "example" : 1000
          },
          "energyLevelCritical" : {
            "type" : "integer",
            "description" : "The energy level value (in %) at/below which the vehicle should be recharged.",
            "example" : 15
          },
          "energyLevelGood" : {
            "type" : "integer",
            "description" : "The energy level value (in %) at/above which the vehicle can be dispatched again when charging.",
            "example" : 60
          },
          "energyLevelFullyRecharged" : {
            "type" : "integer",
            "description" : "The energy level value (in %) at/above which the vehicle is considered fully recharged.",
            "example" : 90
          },
          "energyLevelSufficientlyRecharged" : {
            "type" : "integer",
            "description" : "The energy level value (in %) at/above which the vehicle is considered sufficiently recharged.",
            "example" : 50
          },
          "maxVelocity" : {
            "type" : "integer",
            "description" : "The vehicle's maximum velocity (in mm/s).",
            "example" : 2000
          },
          "maxReverseVelocity" : {
            "type" : "integer",
            "description" : "The vehicle's maximum reverse velocity (in mm/s).",
            "example" : 733
          },
          "layout" : {
            "type" : "object",
            "description" : "The information regarding the grahical representation of this vehicle.",
            "properties" : {
              "routeColor" : {
                "type" : "string",
                "pattern" : "^#([A-Fa-f0-9]{6})$",
                "example" : "#00FF00"
              }
            }
          },
          "properties" : {
            "type" : "array",
            "description" : "This vehicle's properties.",
            "items" : {
              "$ref" : "#/components/schemas/Property"
            }
          }
        },
        "required" : [ "name" ]
      },
      "PlantModelVisualLayout" : {
        "title" : "Visual Layout",
        "type" : "object",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "This visual layout's name.",
            "example" : "some visual layout"
          },
          "scaleX" : {
            "type" : "number",
            "description" : "This layout's scale on the X axis (in mm/pixel).",
            "example" : 50.0
          },
          "scaleY" : {
            "type" : "number",
            "description" : "This layout's scale on the Y axis (in mm/pixel).",
            "example" : 50.0
          },
          "layers" : {
            "type" : "array",
            "description" : "This layout's layers.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelLayer"
            }
          },
          "layerGroups" : {
            "type" : "array",
            "description" : "The layout's layer groups.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelLayerGroup"
            }
          },
          "properties" : {
            "type" : "array",
            "description" : "This visual layout's properties.",
            "items" : {
              "example" : {
                "name" : "visualLayoutProperty",
                "value" : "value"
              }
            }
          }
        },
        "required" : [ "name" ]
      },
      "PlantModelTriple" : {
        "title" : "Triple",
        "type" : "object",
        "properties" : {
          "x" : {
            "type" : "integer",
            "format" : "int64",
            "description" : "The Triple's x value.",
            "example" : 1500
          },
          "y" : {
            "type" : "integer",
            "format" : "int64",
            "description" : "The Triple's y value.",
            "example" : 2000
          },
          "z" : {
            "type" : "integer",
            "format" : "int64",
            "description" : "The Triple's z value.",
            "example" : 500
          }
        },
        "required" : [ "x", "y", "z" ]
      },
      "PlantModelCouple" : {
        "title" : "Couple",
        "type" : "object",
        "properties" : {
          "x" : {
            "type" : "integer",
            "format" : "int64",
            "description" : "The Couple's x value.",
            "example" : 1500
          },
          "y" : {
            "type" : "integer",
            "format" : "int64",
            "description" : "The Couple's y value.",
            "example" : 2000
          }
        },
        "required" : [ "x", "y" ]
      },
      "PlantModelLayer" : {
        "title" : "Layer",
        "type" : "object",
        "properties" : {
          "id" : {
            "type" : "integer",
            "description" : "The unique ID of this layer.",
            "example" : 0
          },
          "ordinal" : {
            "type" : "integer",
            "description" : "The ordinal of this layer. Layers with a higher ordinal are positioned above layers with a lower ordinal.",
            "example" : 0
          },
          "visible" : {
            "type" : "boolean",
            "description" : "Whether this layer is visible or not."
          },
          "name" : {
            "type" : "string",
            "description" : "The name of this layer.",
            "example" : "some layer"
          },
          "groupId" : {
            "type" : "integer",
            "description" : "The ID of the layer group this layer is assigned to.",
            "example" : 0
          }
        },
        "required" : [ "id", "ordinal", "visible", "name", "groupId" ]
      },
      "PlantModelLayerGroup" : {
        "title" : "Layer Group",
        "type" : "object",
        "properties" : {
          "id" : {
            "type" : "integer",
            "description" : "The unique ID of this layer group.",
            "example" : 0
          },
          "name" : {
            "type" : "string",
            "description" : "The name of this layer group.",
            "example" : "some layer"
          },
          "visible" : {
            "description" : "Whether this layer group is visible or not.",
            "type" : "boolean"
          }
        },
        "required" : [ "id", "name", "visible" ]
      },
      "PlantModelEnvelope" : {
        "title" : "Envelope",
        "type" : "object",
        "properties" : {
          "envelopeKey" : {
            "type" : "string",
            "description" : "This envelope's key.",
            "example" : "envelopeType-01"
          },
          "vertices" : {
            "type" : "array",
            "description" : "The sequence of vertices this envelope consists of.",
            "items" : {
              "$ref" : "#/components/schemas/PlantModelCouple"
            },
            "example" : [ {
              "x" : 1500,
              "y" : 1750
            }, {
              "x" : 1600,
              "y" : 1820
            }, {
              "x" : 1700,
              "y" : 1890
            } ]
          }
        }
      },
      "Route" : {
        "title" : "Route",
        "type" : "object",
        "properties" : {
          "destinationPoint" : {
            "type" : "string",
            "description" : "The computed route's destination point.",
            "example" : "Point-A"
          },
          "costs" : {
            "type" : "integer",
            "format" : "int64",
            "description" : "The costs for the computed route, or `-1`, if no route could be computed.",
            "example" : 33475
          },
          "steps" : {
            "type" : "array",
            "description" : "An array containing the computed route's steps, or `null`, if no route could be computed.",
            "items" : {
              "$ref" : "#/components/schemas/Step"
            }
          }
        },
        "required" : [ "destinationPoint", "costs", "steps" ]
      },
      "Step" : {
        "title" : "Single step of a route",
        "type" : "object",
        "properties" : {
          "path" : {
            "type" : "string",
            "description" : "The path to travel for this step.",
            "example" : "Point-A --- Point-B"
          },
          "sourcePoint" : {
            "type" : "string",
            "description" : "The source point for this step.",
            "example" : "Point-A"
          },
          "destinationPoint" : {
            "type" : "string",
            "description" : "The destination point for this step.",
            "example" : "Point-B"
          },
          "vehicleOrientation" : {
            "type" : "string",
            "default" : "UNDEFINED",
            "enum" : [ "FORWARD", "BACKWARD", "UNDEFINED" ]
          }
        },
        "required" : [ "destinationPoint", "vehicleOrientation" ]
      },
      "RoutesRequest" : {
        "title" : "Requested routes",
        "type" : "object",
        "properties" : {
          "sourcePoint" : {
            "type" : "string",
            "description" : "The (optional) starting point for route computation. If `null` or not set, the vehicle's current position will be used.",
            "example" : "Point-A"
          },
          "destinationPoints" : {
            "type" : "array",
            "description" : "The destination point for each route to be computed.",
            "example" : [ "Point-C", "Point-D", "Point-E" ]
          }
        },
        "required" : [ "destinationPoints" ]
      },
      "RoutesResponse" : {
        "title" : "Computed routes for different destination points.",
        "type" : "object",
        "properties" : {
          "routes" : {
            "type" : "array",
            "description" : "The list of computed routes.",
            "items" : {
              "$ref" : "#/components/schemas/Route"
            }
          }
        },
        "required" : [ "Routes" ],
        "example" : {
          "routes" : [ {
            "destinationPoint" : "Point-C",
            "costs" : 77644,
            "steps" : [ {
              "path" : "Point-A --- Point-B",
              "sourcePoint" : "Point-A",
              "destinationPoint" : "Point-B",
              "vehicleOrientation" : "FORWARD"
            }, {
              "path" : "Point-B --- Point-C",
              "sourcePoint" : "Point-B",
              "destinationPoint" : "Point-C",
              "vehicleOrientation" : "FORWARD"
            } ]
          }, {
            "destinationPoint" : "Point-D",
            "costs" : -1,
            "steps" : null
          }, {
            "destinationPoint" : "Point-E",
            "costs" : 67934,
            "steps" : [ {
              "path" : "Point-A --- Point-D",
              "sourcePoint" : "Point-A",
              "destinationPoint" : "Point-D",
              "vehicleOrientation" : "FORWARD"
            }, {
              "path" : "Point-D --- Point-E",
              "sourcePoint" : "Point-D",
              "destinationPoint" : "Point-E",
              "vehicleOrientation" : "BACKWARD"
            } ]
          } ]
        }
      }
    }
  }
}