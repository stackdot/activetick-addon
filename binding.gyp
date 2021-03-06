{
  "targets": [
    {
      "target_name": "NodeActiveTickAddon",
      "sources": [  "NodeActiveTickAddon.cpp",
                    "NodeActiveTick.cpp",
                    "Requestor.cpp",
                    "import/atfeed-cppsdk/example/Helper.cpp",
                    "AtEnumConverter.cpp",
                    "protobuf/messages.pb.cc"
                 ],
      'include_dirs': [
        './import/atfeed-cppsdk/include/',
        "<!(node -e \"require('nan')\")"
      ],
      "cflags":  ['-c -O3 -ffast-math -fexpensive-optimizations -DNDEBUG -fexceptions -std=c++11 -Wno-c++11-extensions'],
      "cflags_cc": ['-c -O3 -ffast-math -fexpensive-optimizations -DNDEBUG -fexceptions -std=c++11 -Wno-c++11-extensions'],
      'cflags!': [ '-fno-rtti' ],
      'cflags_cc!': [ '-fno-rtti' ],
      'conditions': [
        ['OS=="mac"', {
          'xcode_settings': {
            'MACOSX_DEPLOYMENT_TARGET': '10.11',
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'GCC_ENABLE_CPP_RTTI': 'YES',
            'OTHER_CPLUSPLUSFLAGS': [
                      '<!@(pkg-config --cflags protobuf)',
                      '-Wno-c++11-extensions'
                    ],
            'OTHER_CFLAGS': [
                    ],
            'OTHER_LDFLAGS': [
                     ]
          },
          'link_settings': {
            'libraries': [
              '<(module_root_dir)/import/atfeed-cppsdk/bin/libActiveTickServerAPI.dylib',
              '-lpthread',
              '-D_THREAD_SAFE',
              '<!@(pkg-config --libs protobuf)'
            ]
          }
        }],
        ['OS=="linux"', {
          'link_settings': {
            'ldflags': [
            ],
            'libraries':[
              '<(module_root_dir)/libActiveTickServerAPI.so',
              '-lpthread',
              '<!@(pkg-config --libs protobuf)'
            ]
          }
        }],
      ]
    }
  ]
}
